import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { Message } from '../entity/Message';
import { User } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@ArgsType()
export class NewMessageArgs {
  @Field()
  headerId: string;
}

@InputType()
class MessageInput {
  @Field()
  text: string;

  @Field()
  isFromSender: number;

  @Field()
  headerId: string;
}

@Resolver(Message)
export class MessageResolver {
  @FieldResolver(() => User)
  creator(
    @Root() message: Message,
    @Ctx() { userLoader }: MyContext
  ): Promise<User> {
    return userLoader.load(message.creatorId);
  }

  @Query(() => [Message])
  async messages(
    @Arg('headerId') headerId: string,
    @Ctx() { req }: MyContext
  ): Promise<Message[]> {
    return Message.find({
      where: { headerId, creatorId: req.session.userId },
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

  @Mutation(() => Boolean)
  async deleteMessage(@Arg('id') id: string): Promise<boolean> {
    await Message.delete({ id });
    return true;
  }

  @Subscription({
    subscribe: (_root, _args, context, _info) => {
      return context.redisPubsub.asyncIterator('MESSAGES');
    },
  })
  newMessage(
    @Args() _headerId: NewMessageArgs,
    @Root() message: Message
  ): Message {
    return message;
  }
}
