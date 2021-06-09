import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import S3 from 'aws-sdk/clients/s3';
import { Listing } from '../entity/Listing';
import { User } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import cloudinary from 'cloudinary';
import { getConnection } from 'typeorm';
import { REDIS_CACHE_PREFIX } from '../constants';
import { SearchInput, ListingInput, UpdateListing } from './input';

@ObjectType()
class PaginatedListings {
  @Field(() => [Listing])
  listings: Listing[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
class S3Payload {
  @Field()
  signedRequest: string;
  @Field()
  url: string;
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
    @Arg('input') { title, beds, guests }: SearchInput,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedListings> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    let qb = getConnection()
      .getRepository(Listing)
      .createQueryBuilder('l')
      .orderBy('l."createdAt"', 'DESC')
      .take(realLimitPlusOne);

    if (cursor) {
      qb.where('l."createdAt" < :cursor ', {
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

    const listings = await qb.getMany();

    return {
      listings: listings.slice(0, realLimit),
      hasMore: listings.length === realLimitPlusOne,
    };
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async uploadPhoto(
    @Arg('photo') photo: string,
    @Arg('publicId') publicId: string
  ): Promise<String> {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const res = await cloudinary.v2.uploader.unsigned_upload(
      photo,
      'ml_default',
      {
        public_id: publicId,
        folder: 'listings',
        // invalidate: true,
      }
    );

    return res.secure_url;
  }

  @Mutation(() => S3Payload)
  @UseMiddleware(isAuth)
  async signS3(
    @Arg('filename') filename: string,
    @Arg('filetype') filetype: string
  ): Promise<S3Payload> {
    const s3 = new S3({
      signatureVersion: 'v4',
      region: 'us-east-1',
    });

    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: 'public-read',
    };

    const signedRequest = s3.getSignedUrl('putObject', s3Params);
    const url = `https://${process.env.CF_DOMAIN_NAME}/${filename}`;

    return {
      signedRequest,
      url,
    };
  }

  @Mutation(() => Listing)
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteListing(
    @Arg('id') id: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Listing.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
