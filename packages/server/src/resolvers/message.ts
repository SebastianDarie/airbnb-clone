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
import { Message } from '../entity/Message';
import { User } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@InputType()
class MessageInput {
  @Field()
  text: string;

  @Field()
  listingId: string;
}

@Resolver(Message)
export class MessageResolver {
  // @FieldResolver(() => User)
  // creator(
  //   @Root() listing: Listing,
  //   @Ctx() { userLoader }: MyContext
  // ): Promise<User> {
  //   return userLoader.load(listing.creatorId);
  // }

  @Query(() => [Message])
  async messages(
    @Arg('listingId') listingId: string,
    @Ctx() { req }: MyContext
  ): Promise<Message[]> {
    return Message.find({
      where: { listingId, creatorId: req.session.userId },
    });
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg('input') input: MessageInput,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    return Message.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async deleteListing(
  //   @Arg('id') id: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<boolean> {
  //   await Listing.delete({ id, creatorId: req.session.userId });
  //   return true;
  // }
}
