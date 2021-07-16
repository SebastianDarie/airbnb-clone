import { InputType, Field, Int, Float, ObjectType } from 'type-graphql';

@InputType()
class LatLngLiteral {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}

@InputType()
class Bounds {
  @Field(() => LatLngLiteral)
  northEast: LatLngLiteral;

  @Field(() => LatLngLiteral)
  southWest: LatLngLiteral;
}

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  confirm: string;
}

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

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  bathrooms: number;

  @Field(() => Int)
  bedrooms: number;

  @Field(() => Int)
  beds: number;

  @Field(() => Int)
  guests: number;

  @Field()
  city: string;

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

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  bathrooms?: number;

  @Field(() => Int, { nullable: true })
  bedrooms?: number;

  @Field(() => Int, { nullable: true })
  beds?: number;

  @Field(() => Int, { nullable: true })
  guests?: number;

  @Field(() => String, { nullable: true })
  city?: string;

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
  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Bounds, { nullable: true })
  bounds?: Bounds;

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

@InputType()
export class ReviewInput {
  @Field(() => Int)
  rating: number;

  @Field(() => Int)
  cleanliness: number;

  @Field(() => Int)
  accuracy: number;

  @Field(() => Int)
  checkIn: number;

  @Field(() => Int)
  communication: number;

  @Field(() => Int)
  location: number;

  @Field(() => Int)
  value: number;

  @Field(() => Int)
  amenities: number;

  @Field()
  review: string;

  @Field()
  listingId: string;
}
