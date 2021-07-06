import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Header, MessageStatus } from '../entity/Header';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

registerEnumType(MessageStatus, {
  name: 'MessageStatus',
});

@InputType()
class HeaderInput {
  @Field()
  toId: string;

  @Field()
  subject: string;

  @Field(() => MessageStatus)
  status: MessageStatus;

  @Field()
  listingId: string;
}

@Resolver(Header)
export class HeaderResolver {
  // @FieldResolver(() => User)
  // creator(
  //   @Root() listing: Listing,
  //   @Ctx() { userLoader }: MyContext
  // ): Promise<User> {
  //   return userLoader.load(listing.creatorId);
  // }

  @Query(() => [Header])
  async headers(
    @Arg('listingId') listingId: string,
    @Ctx() { req }: MyContext
  ): Promise<Header[]> {
    return Header.find({
      where: { listingId, creatorId: req.session.userId },
    });
  }

  @Mutation(() => Header)
  //  @UseMiddleware(isAuth)
  async createHeader(
    @Arg('input') input: HeaderInput,
    @Ctx() { req }: MyContext
  ): Promise<Header> {
    const existingHeader = await Header.findOne({
      where: { listingId: input.listingId },
    });

    if (existingHeader) {
      return existingHeader;
    }

    return Header.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
    //await redisPubsub.publish('MESSAGES', message);
  }
}
