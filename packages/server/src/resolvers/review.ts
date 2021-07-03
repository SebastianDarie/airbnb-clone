// import {
//   Arg,
//   Ctx,
//   Field,
//   InputType,
//   Mutation,
//   Query,
//   Resolver,
//   UseMiddleware,
// } from 'type-graphql';
// import { Review } from '../entity/Review';
// import { isAuth } from '../middleware/isAuth';
// import { MyContext } from '../types';

// @InputType()
// class ReviewInput {
//   @Field()
//   rating: number;

//   @Field()
//   review: string;

//   @Field()
//   listingId: string;
// }

// @Resolver(Review)
// export class ReviewResolver {
//   // @FieldResolver(() => User)
//   // creator(
//   //   @Root() listing: Listing,
//   //   @Ctx() { userLoader }: MyContext
//   // ): Promise<User> {
//   //   return userLoader.load(listing.creatorId);
//   // }

//   @Query(() => [Review])
//   async reviews(@Arg('listingId') listingId: string): Promise<Review[]> {
//     return Review.find({
//       where: { listingId },
//     });
//   }

//   @Mutation(() => Review)
//   @UseMiddleware(isAuth)
//   async createReview(
//     @Arg('input') input: ReviewInput,
//     @Ctx() { req }: MyContext
//   ): Promise<Review> {
//     return Review.create({
//       ...input,
//       creatorId: req.session.userId,
//     }).save();
//   }
// }
