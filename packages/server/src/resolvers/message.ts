import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { Listing } from '../entity/Listing';
import { Message } from '../entity/Message';
import { User } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@ArgsType()
export class NewMessageArgs {
  @Field()
  listingId: string;
}

@InputType()
class MessageInput {
  @Field()
  text: string;

  @Field()
  listingId: string;
}

@ObjectType()
class MessagePayload {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  creatorId: string;

  @Field()
  createdAt: Date;
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
    @Ctx() { req }: MyContext,
    @PubSub('MESSAGES') publish: Publisher<Message>
  ): Promise<Message> {
    const message = await Message.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
    console.log(message);
    await publish(message);
    return message;
  }

  @Subscription({
    topics: 'MESSAGES',
    filter: ({
      payload,
      args,
    }: ResolverFilterData<Message, NewMessageArgs>) => {
      return payload.listingId === args.listingId;
    },
  })
  newMessage(
    // @Ctx() { pubsub }: MyContext,
    @Args() listingId: string,
    @PubSub() pubsub: PubSubEngine,
    @Root() message: Message
  ): MessagePayload {
    pubsub.asyncIterator(['MESSAGES']);
    console.log(message);
    return message;
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
