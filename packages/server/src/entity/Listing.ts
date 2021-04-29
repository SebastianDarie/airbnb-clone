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
  @Column({ length: 255 })
  description!: string;

  @Field()
  @Column()
  categories!: string;

  @Field()
  @Column()
  photoUrl!: string;

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

  @Field(() => [String])
  @Column({ type: 'text', array: true })
  amenities: string[];

  @Field()
  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (user) => user.listings)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
