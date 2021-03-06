import S3 from 'aws-sdk/clients/s3';
import Stripe from 'stripe';
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
import { getConnection, SelectQueryBuilder } from 'typeorm';
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

  @Query(() => Listing, { nullable: true })
  async listing(@Arg('id') id: string): Promise<Listing | undefined> {
    return Listing.findOne(id, { cache: 60000 });
  }

  @Query(() => PaginatedListings)
  async searchListings(
    @Arg('input')
    { bounds, latitude, longitude, guests }: SearchInput,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedListings> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const origin = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    let qb: SelectQueryBuilder<Listing> = getConnection()
      .getRepository(Listing)
      .createQueryBuilder('l');

    if (bounds) {
      qb.select('*')
        .where('l.latitude < :ne_lat AND l.longitude < :ne_lng')
        .andWhere('l.latitude > :sw_lat AND l.longitude > :sw_lng')
        .setParameters({
          ne_lat: bounds?.northEast.lat,
          ne_lng: bounds?.northEast.lng,
          sw_lat: bounds?.southWest.lat,
          sw_lng: bounds?.southWest.lng,
        })
        .cache(true);
    } else if (latitude && longitude) {
      qb.select([
        '*',
        `ST_Distance(l.location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(l.location))) * 0.000621371 AS distance`,
      ])
        .where(
          `ST_DWithin(l.location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(l.location)), :range)`
        )
        .orderBy('distance', 'ASC')
        .setParameters({
          origin: JSON.stringify(origin),
          range: 100 * 1000,
        })
        .cache(30000)
        .take(realLimitPlusOne);
    }

    if (cursor) {
      qb.andWhere('l."createdAt" < :cursor ', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    if (guests) {
      qb = qb.andWhere('l.guests = :guests', { guests });
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
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Listing.create({
      ...input,
      creatorId: req.session.userId,
      location: {
        type: 'Point',
        coordinates: [input.longitude, input.latitude],
      },
    }).save();

    return true;
  }

  @Mutation(() => Listing, { nullable: true })
  @UseMiddleware(isAuth)
  async updateListing(
    @Arg('id') id: string,
    @Arg('input') input: UpdateListing,
    @Ctx() { req }: MyContext
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
      let amount = Math.floor(listing.price * nights);
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
