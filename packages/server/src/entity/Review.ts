import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
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
  @Column()
  review: string;

  @Field()
  @Column('uuid')
  listingId: string;

  @Field(() => Listing)
  @ManyToOne(() => Listing, (listing) => listing.reviews)
  @TypeormLoader()
  listing: Listing;

  @Field()
  @Column('uuid')
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, (creator) => creator.reviews)
  @TypeormLoader()
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
