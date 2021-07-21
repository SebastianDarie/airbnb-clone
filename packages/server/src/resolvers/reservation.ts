import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
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
    // return getConnection().getRepository(Reservation).query(
    //   `
    //   INSERT INTO "reservation"("id", "during", "guests", "listingId", "guestId", "createdAt", "updatedAt")
    //   VALUES(DEFAULT, $1, $2, $3, $4, DEFAULT, DEFAULT) RETURNING "id", "createdAt", "updatedAt"
    // `,
    //   [input.during, input.guests, input.listingId, req.session.userId]
    // );
    return Reservation.create({
      ...input,
      guestId: req.session.userId,
    }).save();
  }
}
