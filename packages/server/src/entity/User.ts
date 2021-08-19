import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Header } from "./Header";
import { Listing } from "./Listing";
import { Message } from "./Message";
import { Reservation } from "./Reservation";
import { Review } from "./Review";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Field()
  @Column({ default: "Test User" })
  name!: string;

  @Column() password!: string;

  @Field()
  @Column({
    default: "https://a0.muscache.com/defaults/user_pic-50x50.png?v=3",
  })
  photoUrl!: string;

  @Field()
  @Column({ default: false })
  forgotPasswordLocked: boolean;

  @Field()
  @Column({ type: "bit", default: 0 })
  superhost: number;

  @OneToMany(() => Header, (header) => header.creator)
  headers: Header[];

  @OneToMany(() => Listing, (listing) => listing.creator)
  listings: Listing[];

  @OneToMany(() => Message, (message) => message.creator)
  messages: Message[];

  @OneToMany(() => Reservation, (reservation) => reservation.guest)
  reservations: Reservation[];

  @OneToMany(() => Review, (review) => review.creator)
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
