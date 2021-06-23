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
} from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@ObjectType()
@Entity()
export class Listing extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ length: 50 })
  title!: string;

  @Field()
  @Column({ length: 500 })
  description!: string;

  @Field()
  @Column()
  category!: string;

  @Field()
  @Column()
  type!: string;

  @Field(() => [String])
  @Column({ type: 'text', array: true })
  photos!: string[];

  @Field()
  @Column()
  price!: string;

  @Field()
  @Column({ type: 'int' })
  bathrooms!: number;

  @Field()
  @Column({ type: 'int' })
  bedrooms!: number;

  @Field()
  @Column({ type: 'int' })
  beds!: number;

  @Field()
  @Column({ type: 'int' })
  guests!: number;

  @Field()
  @Column({ type: 'double precision' })
  latitude!: number;

  @Field()
  @Column({ type: 'double precision' })
  longitude!: number;

  @Field(() => [String])
  @Column({ type: 'text', array: true })
  amenities: string[];

  @Field(() => [String])
  @Column({ type: 'text', array: true })
  highlights: string[];

  @Field()
  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (user) => user.listings)
  creator: User;

  @OneToMany(() => Message, (message) => message.listing)
  messages: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
