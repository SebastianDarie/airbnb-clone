// import { Field, Int, ObjectType } from 'type-graphql';
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Listing } from './Listing';
// import { User } from './User';

// @ObjectType()
// @Entity()
// export class Review extends BaseEntity {
//   @Field()
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Field(() => Int)
//   @Column()
//   rating: number;

//   @Field()
//   @Column()
//   review: string;

//   @Field()
//   @Column('uuid')
//   listingId: string;

//   @ManyToOne(() => Listing, (listing) => listing.reviews)
//   listing: Listing;

//   @Field()
//   @Column('uuid')
//   creatorId: string;

//   @ManyToOne(() => User, (creator) => creator.reviews)
//   creator: User;

//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt: Date;

//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt: Date;
// }
