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
  Index,
} from 'typeorm';
import { Point } from 'geojson';
import { Message } from './Message';
import { User } from './User';
import { Review } from './Review';
import { Reservation } from './Reservation';

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
  @Column()
  city!: string;

  @Field()
  @Column({ type: 'double precision' })
  latitude!: number;

  @Field()
  @Column({ type: 'double precision' })
  longitude!: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

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

  @OneToMany(() => Reservation, (reservation) => reservation.listing)
  reservations: Reservation[];

  @OneToMany(() => Review, (review) => review.listing)
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
