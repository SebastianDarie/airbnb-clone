import Stripe from 'stripe';
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

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
});

@Resolver(Reservation)
export class ReservationResolver {
  @Query(() => [Reservation])
  async reservations(@Ctx() { req }: MyContext): Promise<Reservation[]> {
    return Reservation.find({
      where: { guestId: req.session.userId },
      order: { createdAt: 'DESC' },
    });
  }

  @Query(() => Reservation, { nullable: true })
  async reservation(@Arg('id') id: string): Promise<Reservation | undefined> {
    return Reservation.findOne(id);
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

  @Mutation(() => Boolean)
  async cancelReservation(
    @Arg('id') id: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await getConnection()
      .createQueryBuilder()
      .update(Reservation)
      .set({ cancelled: 1 })
      .where('id = :id and "guestId" = :guestId', {
        id,
        guestId: req.session.userId,
      })
      .execute();

    return true;
  }

  @Mutation(() => Boolean)
  async refundReservation(
    @Arg('paymentIntent') paymentIntent: string
  ): Promise<Boolean> {
    await stripe.refunds.create({
      payment_intent: paymentIntent,
    });

    return true;
  }
}
