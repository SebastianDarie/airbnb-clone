import S3 from 'aws-sdk/clients/s3';
import Stripe from 'stripe';
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

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
});

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

  @Mutation(() => String, { nullable: true })
  @UseMiddleware(isAuth)
  async createPaymentIntent(
    @Arg('id') id: string,
    @Arg('nights', () => Int) nights: number
  ): Promise<String | null> {
    const listing = await Listing.findOne(id);
    if (listing) {
      const price = parseFloat(listing?.price.slice(1));
      let amount = Math.floor(price * nights);
      const fee = Math.floor((amount / 100) * 17);
      amount += fee;
      amount *= 100;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      return paymentIntent.client_secret;
    }

    return 'Failed to create intent';
  }
}
