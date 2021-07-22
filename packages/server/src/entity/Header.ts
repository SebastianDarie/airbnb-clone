import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Listing } from './Listing';
import { Message } from './Message';
import { Reservation } from './Reservation';
import { User } from './User';

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

  @Field({ nullable: true })
  @Column('uuid', { nullable: true })
  reservationId: string;

  @OneToOne(() => Reservation, { cascade: true, nullable: true })
  @JoinColumn()
  reservation: Reservation;

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
