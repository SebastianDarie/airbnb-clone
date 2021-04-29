import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Listing } from '../entity/Listing';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@InputType()
class ListingInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  categories: string;

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
  @Query(() => [Listing])
  async listings(): Promise<Listing[]> {
    return Listing.find({});
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
      photoUrl: '',
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
