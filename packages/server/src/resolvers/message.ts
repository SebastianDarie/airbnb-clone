import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { Message } from '../entity/Message';
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
  isFromSender: number;

  @Field()
  listingId: string;

  @Field()
  headerId: string;
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
    @Ctx() { req, redisPubsub }: MyContext
  ): Promise<Message> {
    const message = await Message.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
    await redisPubsub.publish('MESSAGES', message);
    return message;
  }

  @Subscription({
    subscribe: (_root, _args, context, _info) => {
      return context.redisPubsub.asyncIterator('MESSAGES');
    },
  })
  newMessage(
    @Args() _listingId: NewMessageArgs,
    @Root() message: Message
  ): Message {
    console.log(message);
    return message;
  }
}
