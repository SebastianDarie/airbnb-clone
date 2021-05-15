import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Listing } from '../entity/Listing';
import { User } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import cloudinary from 'cloudinary';

@InputType()
class ListingInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field()
  photoUrl: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  beds: number;

  @Field(() => Int)
  guests: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => [String])
  amenities: string[];
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
  async listings(): Promise<Listing[]> {
    return Listing.find({});
  }

  @Query(() => Listing, { nullable: true })
  async listing(@Arg('id') id: string): Promise<Listing | undefined> {
    return Listing.findOne(id);
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async uploadPhoto(@Arg('photo') photo: string): Promise<String> {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const res = await cloudinary.v2.uploader.unsigned_upload(
      photo,
      'ml_default',
      {
        public_id: '',
        folder: 'listings',
      }
    );

    return res.secure_url;
  }

  @Mutation(() => Listing)
  @UseMiddleware(isAuth)
  async createListing(
    @Arg('input') input: ListingInput,
    @Ctx() { req }: MyContext
  ): Promise<Listing> {
    return Listing.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
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
