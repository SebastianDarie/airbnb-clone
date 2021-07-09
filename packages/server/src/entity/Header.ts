import { ObjectType, Field, registerEnumType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Listing } from './Listing';
import { Message } from './Message';
import { User } from './User';

export enum MessageStatus {
  DELIVERED = 'delivered',
  SENDING = 'sending',
  SENT = 'sent',
}

registerEnumType(MessageStatus, {
  name: 'MessageStatus',
});

@ObjectType()
@Entity()
export class Header extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column('uuid')
  toId: string;

  @Field()
  @Column({ type: 'varchar' })
  subject: string;

  // @Field()
  // @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.SENDING })
  // status: MessageStatus;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.header, {
    onDelete: 'CASCADE',
  })
  messages: Message[];

  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (user) => user.headers)
  creator: User;

  @Field()
  @Column('uuid')
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.headers)
  listing: Listing;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
