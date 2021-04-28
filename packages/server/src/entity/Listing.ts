import { ObjectType, Field, Int } from 'type-graphql';
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
import { User } from './User';

@ObjectType()
@Entity()
export class Listing extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Field()
  @Column({ length: 50 })
  title!: string;

  @Field()
  @Column({ length: 255 })
  description!: string;

  @Field()
  @Column()
  pictureUrl!: string;

  @Field()
  @Column({ type: 'int' })
  price!: number;

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

  @Field()
  @Column({ type: 'text', array: true })
  amenities: string[];

  // @Field()
  // @Column()
  // creatorId: number;

  // @Field()
  // @ManyToOne(() => User, (user) => user.posts)
  // creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
