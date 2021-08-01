import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Review } from '../entity/Review';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { ReviewInput } from './input';

@Resolver(Review)
export class ReviewResolver {
  @Query(() => [Review])
  async reviews(@Arg('listingId') listingId: string): Promise<Review[]> {
    return Review.find({
      where: { listingId },
      cache: true,
    });
  }

  @Mutation(() => Review)
  @UseMiddleware(isAuth)
  async createReview(
    @Arg('input') input: ReviewInput,
    @Ctx() { req }: MyContext
  ): Promise<Review> {
    return Review.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }
}
