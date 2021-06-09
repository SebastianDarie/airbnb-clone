import { InputType, Field, Int, Float } from 'type-graphql';

@InputType()
export class ListingInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field()
  photoUrl: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  beds: number;

  @Field(() => Int)
  guests: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => [String])
  amenities: string[];
}

@InputType()
export class UpdateListing {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  beds?: number;

  @Field(() => Int, { nullable: true })
  guests?: number;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => [String], { nullable: true })
  amenities?: string[];
}

@InputType()
export class SearchInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  beds?: number;

  @Field(() => Int, { nullable: true })
  guests?: number;
}
