import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Header, MessageStatus } from '../entity/Header';
import { Message } from '../entity/Message';
import { User } from '../entity/User';
import { MyContext } from '../types';

// registerEnumType(MessageStatus, {
//   name: 'MessageStatus',
// });

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
  @FieldResolver(() => User)
  creator(
    @Root() header: Header,
    @Ctx() { userLoader }: MyContext
  ): Promise<User> {
    return userLoader.load(header.creatorId);
  }

  // @FieldResolver(() => Message)
  // messages(
  //   @Root() header: Header,
  //   @Ctx() { messageLoader }: MyContext
  // ): Promise<Message> {
  //   return messageLoader.load(header.creatorId);
  // }

  @Query(() => [Header])
  async headers(
    @Arg('headerId') headerId: string,
    @Ctx() { req }: MyContext
  ): Promise<Header[]> {
    //const currHeader = await Header.findOne(headerId)

    //return Header.find({ relations: ['messages'], where: { id: headerId } });

    return (
      getConnection()
        .getRepository(Header)
        .createQueryBuilder('h')
        //.select('*')
        .leftJoinAndSelect('h.messages', 'm')
        .where('h."creatorId" = :creatorId', { creatorId: req.session.userId })
        .andWhere('h."toId" = :toId', { toId: req.session.userId })
        .orderBy('h."createdAt"', 'DESC')
        .getMany()
    );
  }

  @Query(() => [Header])
  async headersListing(@Arg('listingId') listingId: string): Promise<Header[]> {
    // return getConnection()
    //   .getRepository(Header)
    //   .createQueryBuilder('h')
    //   .select('*')
    //   .where(`h."listingId" = :listingId`, { listingId })
    //   .addSelect('m.id')
    //   .leftJoin('h.messages', 'm', 'm."listingId" = h.id')
    //   .orderBy('h."createdAt"', 'DESC')
    //   .getRawMany();

    return Header.find({ relations: ['messages'], where: { listingId } });
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
