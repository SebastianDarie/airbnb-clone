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
  type: string;

  @Field(() => [String])
  photos: string[];

  @Field()
  price: string;

  @Field(() => Int)
  bathrooms: number;

  @Field(() => Int)
  bedrooms: number;

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

  @Field(() => [String])
  highlights: string[];
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
  type?: string;

  @Field(() => [String], { nullable: true })
  photos?: string[];

  @Field({ nullable: true })
  price?: string;

  @Field(() => Int, { nullable: true })
  bathrooms?: number;

  @Field(() => Int, { nullable: true })
  bedrooms?: number;

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

  @Field(() => [String], { nullable: true })
  highlights?: string[];
}

@InputType()
export class SearchInput {
  @Field(() => Float, { defaultValue: 40, nullable: true })
  latitude?: number;

  @Field(() => Float, { defaultValue: -74.5, nullable: true })
  longitude?: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  beds?: number;

  @Field(() => Int, { nullable: true })
  guests?: number;
}

@InputType()
export class Photo {
  @Field()
  name: string;

  @Field()
  src: string;

  @Field()
  type: string;
}
