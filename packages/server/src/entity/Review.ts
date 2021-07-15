import { Field, Float, ObjectType } from 'type-graphql';
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
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ type: 'int' })
  rating: number;

  @Field()
  @Column({ type: 'int' })
  cleanliness: number;

  @Field()
  @Column({ type: 'int' })
  accuracy: number;

  @Field()
  @Column({ type: 'int' })
  checkIn: number;

  @Field()
  @Column({ type: 'int' })
  communication: number;

  @Field()
  @Column({ type: 'int' })
  location: number;

  @Field()
  @Column({ type: 'int' })
  value: number;

  @Field()
  @Column({ type: 'int' })
  amenities: number;

  @Field()
  @Column()
  review: string;

  @Field()
  @Column('uuid')
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.reviews)
  listing: Listing;

  @Field()
  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (creator) => creator.reviews)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}