import S3 from 'aws-sdk/clients/s3';
import { Point } from 'geojson';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { REDIS_CACHE_PREFIX } from '../constants';
import { Listing } from '../entity/Listing';
import { User } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { ListingInput, Photo, SearchInput, UpdateListing } from './input';

@ObjectType()
class PaginatedListings {
  @Field(() => [Listing])
  listings: Listing[];

  @Field()
  hasMore: boolean;
}

@Resolver(Listing)
export class ListingResolver {
  @FieldResolver(() => User)
  creator(
    @Root() listing: Listing,
    @Ctx() { userLoader }: MyContext
  ): Promise<User> {
    return userLoader.load(listing.creatorId);
  }

  @Query(() => [Listing])
  async listings(@Ctx() { redis }: MyContext): Promise<Listing[]> {
    const listings = (await redis.lrange(REDIS_CACHE_PREFIX, 0, -1)) || [];
    return listings.map((listing) => JSON.parse(listing));
  }

  @Query(() => Listing, { nullable: true })
  async listing(@Arg('id') id: string): Promise<Listing | undefined> {
    return Listing.findOne(id);
  }

  @Query(() => PaginatedListings)
  async searchListings(
    @Arg('input') { latitude, longitude, title, beds, guests }: SearchInput,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedListings> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    // const distance = await getConnection().query(
    //   `
    //   select *, ( 3959 * acos( cos( radians(37) ) * cos( radians( $1 ) ) *
    //   cos( radians( $2 ) - radians(-122) ) + sin( radians(37) ) *
    //   sin( radians( $1 ) ) ) )
    //   as pos from listing
    //   having ( 3959 * acos( cos( radians(37) ) * cos( radians( $1 ) ) *
    //   cos( radians( $2 ) - radians(-122) ) + sin( radians(37) ) *
    //   sin( radians( $1 ) ) ) ) < 25
    //   order by pos
    //   limit 20
    // `,
    //   [latitude, longitude]
    // );
    //console.log(distance);

    // CREATE OR REPLACE FUNCTION distance(lat1 FLOAT, lon1 FLOAT, lat2 FLOAT, lon2 FLOAT) RETURNS FLOAT AS $$
    //   DECLARE
    //       x float = 69.1 * (lat2 - lat1);
    //       y float = 69.1 * (lon2 - lon1) * cos(lat1 / 57.3);
    //   BEGIN
    //       RETURN sqrt(x * x + y * y);
    //   END
    //   $$ LANGUAGE plpgsql;

    //sqrt(69.1 * (50 - 40) * 69.1 * (50 - 40) + 69.1 * (-65.4 - -74.5) * cos(40 / 57.3))
    // ( 3959 * acos( cos( radians(37) ) * cos( radians( $1 ) ) *
    //   cos( radians( $2 ) - radians(-122) ) + sin( radians(37) ) *
    //   sin( radians( $1 ) ) ) )
    // const nearListings: Listing[] = await getConnection().query(
    //   `
    //   select *,
    //   sqrt(69.1 * (50 - $1) * 69.1 * (50 - $1) + 69.1 * (-65.4 - $2) * cos($1 / 57.3))
    //   as pos from listing;
    //   `,
    //   [latitude, longitude]
    // );
    //console.log(nearListings, nearListings.length);

    //ST_GeomFromGeoJSON(:origin), ST_SRID(location)

    const origin = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    // const locations = await getConnection()
    //   .getRepository(Listing)
    //   .createQueryBuilder('t')
    //   .select([
    //     '*',
    //     `ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location))) * 0.000621371 AS distance`,
    //   ])
    //   .where(
    //     ` ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)), :range)`
    //   )
    //   .orderBy('distance', 'ASC')
    //   .setParameters({
    //     longitude,
    //     latitude,
    //     origin: JSON.stringify(origin),
    //     range: 300 * 1000,
    //   })
    //   .getRawMany();

    // console.log(locations, locations.length);

    let qb = getConnection()
      .getRepository(Listing)
      .createQueryBuilder('l')
      .select([
        '*',
        `ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location))) * 0.000621371 AS distance`,
      ])
      .where(
        ` ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)), :range)`
      )
      .orderBy('distance', 'ASC')
      .setParameters({ origin: JSON.stringify(origin), range: 300 * 1000 })
      .take(realLimitPlusOne);

    // .where('l.latitude = :latitude', { latitude })
    // .andWhere('l.longitude = :longitude', { longitude });

    if (cursor) {
      qb.andWhere('l."createdAt" < :cursor ', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    if (guests) {
      qb = qb.andWhere('l.guests = :guests', { guests });
    }
    if (beds) {
      qb = qb.andWhere('l.beds = :beds', { beds });
    }
    if (title) {
      qb = qb.andWhere('l.title ilike :title', {
        title: `%${title}%`,
      });
    }

    const listings = await qb.getRawMany();

    return {
      listings: listings.slice(0, realLimit),
      hasMore: listings.length === realLimitPlusOne,
    };
  }

  @Mutation(() => [String])
  @UseMiddleware(isAuth)
  async signS3(
    @Arg('photos', () => [Photo])
    photos: Photo[]
  ): Promise<string[]> {
    const s3 = new S3({
      signatureVersion: 'v4',
      region: 'us-east-1',
    });

    let sArr: string[] = [];
    let uArr: string[] = [];
    photos.map((p) => {
      const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: p.name,
        Expires: 60,
        ContentType: p.type,
        ACL: 'public-read',
      };

      const signedRequest = s3.getSignedUrl('putObject', s3Params);
      const url = `https://${process.env.CF_DOMAIN_NAME}/${p.name}`;

      sArr.push(signedRequest);
      uArr.push(url);
    });

    return [...sArr, ...uArr];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createListing(
    @Arg('input') input: ListingInput,
    @Ctx() { req, redis }: MyContext
  ): Promise<boolean> {
    const listing = await Listing.create({
      ...input,
      creatorId: req.session.userId,
    }).save();

    redis.lpush(REDIS_CACHE_PREFIX, JSON.stringify(listing));

    return true;
  }

  @Mutation(() => Listing, { nullable: true })
  @UseMiddleware(isAuth)
  async updateListing(
    @Arg('id') id: string,
    @Arg('input') input: UpdateListing,
    @Ctx() { req, redis }: MyContext
  ): Promise<Listing | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Listing)
      .set({ ...input })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning('*')
      .execute();

    const listings = await redis.lrange(REDIS_CACHE_PREFIX, 0, -1);
    const idx = listings.findIndex((listing) => JSON.parse(listing).id === id);
    await redis.lset(REDIS_CACHE_PREFIX, idx, JSON.stringify(result.raw[0]));

    return result.raw[0];
  }

  @Mutation(() => Listing)
  async createLocation(
    @Arg('id') id: string,
    @Arg('latitude', () => Float) latitude: number,
    @Arg('longitude', () => Float) longitude: number
  ): Promise<Listing> {
    const location: Point = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const result = await getConnection()
      .createQueryBuilder()
      .update(Listing)
      .set({ location })
      .where('id = :id', { id })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteListing(
    @Arg('id') id: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Listing.delete({ id, creatorId: req.session.userId });
    return true;
  }

  @Query(() => Boolean) async getDBInfo(): Promise<boolean> {
    const res = await getConnection().query(`
    SELECT CONCAT('{"columns": [',COALESCE(cols_metadata,''),'], "indexes": [',COALESCE(indexes_metadata,''),'], "tables":[',COALESCE(tbls_metadata,''),'], "server_name": "', '', '", "version": "', '', '"}') 
    FROM 
    (
      SELECT array_to_string(array_agg(CONCAT('{"schema":"',cols.table_schema,'","table":"',cols.table_name,'","name":"', cols.column_name, '","type":"', REPLACE(cols.data_type, '"', ''), '","nullable":', CASE WHEN(cols.IS_NULLABLE = 'YES') THEN 'true' ELSE 'false' END, ',"collation":"', COALESCE(cols.COLLATION_NAME, ''), '"}') ), ',') as cols_metadata
      FROM information_schema.columns cols
      WHERE cols.table_schema not in ('information_schema', 'pg_catalog')
    ) cols,
    (
    select
      array_to_string(array_agg(CONCAT('{"schema":"',ns.nspname,'","table":"',t.relname,'","name":"', i.relname, '","column":"', a.attname, '","index_type":"', LOWER(am.amname), '","cardinality":', 0, ',"unique":', case when ix.indisunique = true then 'true' else 'false' end, '}')), ',') as indexes_metadata
    from
        pg_class t,
        pg_class i,
        pg_index ix,
        pg_attribute a,
        pg_catalog.pg_namespace ns,
        pg_am am
    where
        t.oid = ix.indrelid
        and i.oid = ix.indexrelid
        and a.attrelid = t.oid
        and a.attnum = ANY(ix.indkey)
        and t.relkind = 'r'
        and t.relnamespace = ns.oid
        and am.oid=i.relam
    ) indexes_metadata,
    (
      SELECT array_to_string(array_agg(CONCAT('{', '"schema":"', TABLE_SCHEMA, '",', '"table":"', TABLE_NAME, 
                    '",', '"rows":', 
                    COALESCE((SELECT s.n_live_tup FROM pg_stat_user_tables s where tbls.TABLE_SCHEMA = s.schemaname and tbls.TABLE_NAME = s.relname), 0),
                    ', "type":"', TABLE_TYPE, '",', '"engine":"",', '"collation":""}')), ',') as tbls_metadata
      FROM information_schema.tables tbls
      WHERE tbls.TABLE_SCHEMA not in ('information_schema', 'pg_catalog')
    ) tbls;
    `);

    console.log(res);

    return true;
  }
}
