import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Reservation } from '../entity/Reservation';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { ReservationInput } from './input';

@Resolver(Reservation)
export class ReservationResolver {
  @Query(() => [Reservation])
  async reservations(@Ctx() { req }: MyContext): Promise<Reservation[]> {
    return Reservation.find({
      where: { guestId: req.session.userId },
    });
  }

  @Mutation(() => Reservation)
  @UseMiddleware(isAuth)
  async createReservation(
    @Arg('input') input: ReservationInput,
    @Ctx() { req }: MyContext
  ): Promise<Reservation> {
    return Reservation.create({
      ...input,
      guestId: req.session.userId,
    }).save();
  }
}
