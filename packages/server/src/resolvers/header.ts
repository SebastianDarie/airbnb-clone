import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Header } from '../entity/Header';
import { User } from '../entity/User';
import { MyContext } from '../types';
import { HeaderInput } from './input';

@ArgsType()
export class NewHeaderArgs {
  @Field()
  creatorId: string;

  @Field()
  toId: string;
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

  @Query(() => [Header])
  async headers(@Ctx() { req }: MyContext): Promise<Header[]> {
    return getConnection()
      .getRepository(Header)
      .createQueryBuilder('h')
      .leftJoinAndSelect('h.messages', 'm')
      .where('h."creatorId" = :creatorId', {
        creatorId: req.session.userId,
      })
      .orWhere('h."toId" = :toId', { toId: req.session.userId })
      .orderBy('h."createdAt"', 'DESC')
      .cache(true)
      .getMany();
  }

  @Query(() => Header || undefined)
  async latestHeader(@Ctx() { req }: MyContext): Promise<Header | undefined> {
    return Header.findOne({
      where: [{ creatorId: req.session.userId }, { toId: req.session.userId }],
      order: { updatedAt: 'DESC' },
    });
  }

  @Mutation(() => Header)
  //  @UseMiddleware(isAuth)
  async createHeader(
    @Arg('input') input: HeaderInput,
    @Ctx() { req, redisPubsub }: MyContext
  ): Promise<Header> {
    const existingHeader = await Header.findOne({
      where: { creatorId: req.session.userId, listingId: input.listingId },
    });

    if (existingHeader) {
      return existingHeader;
    }

    const newHeader = await Header.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
    await redisPubsub.publish('HEADERS', newHeader);

    return newHeader;
  }

  @Mutation(() => Boolean)
  async deleteHeader(@Arg('id') id: string): Promise<Boolean> {
    await Header.delete(id);
    return true;
  }

  @Subscription({
    subscribe: (_root, _args, context, _info) => {
      return context.redisPubsub.asyncIterator('HEADERS');
    },
  })
  newHeader(@Args() {}: NewHeaderArgs, @Root() header: Header): Header {
    return header;
  }
}
