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
import { Header } from './Header';
import { Listing } from './Listing';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ type: 'bit' })
  isFromSender: number;

  @Field()
  @Column({ type: 'text' })
  text!: string;

  @Field()
  @Column({ type: 'bit', default: 0 })
  read: number;

  @Field()
  @Column('uuid')
  headerId: string;

  @ManyToOne(() => Header, (header) => header.messages)
  header: Header;

  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (user) => user.messages)
  creator: User;

  // @Field()
  // @Column('uuid')
  // listingId: string;

  // @ManyToOne(() => Listing, (listing) => listing.messages)
  // listing: Listing;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
