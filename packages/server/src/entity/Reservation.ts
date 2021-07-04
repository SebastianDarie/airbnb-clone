import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Listing } from './Listing';
import { User } from './User';

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => [Date])
  @Column({ type: 'tsrange' })
  during: [Date, Date];

  @Field()
  @Column('uuid')
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.reservations)
  listing: Listing;

  @Field()
  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (creator) => creator.reservations)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
