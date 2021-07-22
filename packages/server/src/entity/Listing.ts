import { Point } from 'geojson';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Header } from './Header';
import { Reservation } from './Reservation';
import { Review } from './Review';
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
  @Column({ type: 'double precision', default: 25 })
  price!: number;

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

  @OneToMany(() => Header, (header) => header.creator)
  headers: Header[];

  @OneToMany(() => Reservation, (reservation) => reservation.listing)
  reservations: Reservation[];

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.listing)
  @TypeormLoader()
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
