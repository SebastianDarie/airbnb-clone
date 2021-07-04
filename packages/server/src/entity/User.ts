import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Listing } from './Listing';
import { Message } from './Message';
import { Reservation } from './Reservation';
import { Review } from './Review';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Field()
  @Column({ default: 'Test User' })
  name!: string;

  @Column() password!: string;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field()
  @Column({ default: false })
  forgotPasswordLocked: boolean;

  @Field()
  @Column({ default: false })
  superhost: boolean;

  @OneToMany(() => Listing, (listing) => listing.creator)
  listings: Listing[];

  @OneToMany(() => Message, (message) => message.creator)
  messages: Message[];

  @OneToMany(() => Reservation, (reservation) => reservation.creator)
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
