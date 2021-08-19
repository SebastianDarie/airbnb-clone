import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Header } from "./Header";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "bit" })
  isFromSender: number;

  @Field()
  @Column({ type: "text" })
  text!: string;

  @Field()
  @Column("uuid")
  @Index()
  headerId: string;

  @ManyToOne(() => Header, (header) => header.messages)
  header: Header;

  @Column("uuid")
  @Index()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.messages)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
