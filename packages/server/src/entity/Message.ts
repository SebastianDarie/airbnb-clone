import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Listing } from './Listing';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (user) => user.messages)
  creator: User;

  @Field()
  @Column('uuid')
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.messages)
  listing: Listing;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
