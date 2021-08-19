import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Listing } from "./Listing";
import { User } from "./User";

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "date" })
  @Index()
  arrival: Date;

  @Field(() => String)
  @Column({ type: "date" })
  @Index()
  departure: Date;

  @Field(() => Int)
  @Column({ type: "int" })
  guests: number;

  @Field(() => Int)
  @Column({ type: "bit", default: 0 })
  cancelled: number;

  @Field(() => Int)
  @Column({ type: "bit", default: 0 })
  completed: number;

  @Field(() => String)
  @Column()
  paymentIntent: string;

  @Field()
  @Column("uuid")
  @Index()
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.reservations)
  listing: Listing;

  @Field()
  @Column("uuid")
  @Index()
  guestId: string;

  @ManyToOne(() => User, (guest) => guest.reservations)
  guest: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
