import {
  FetchMoreQueryOptions,
  FetchMoreOptions,
  ApolloQueryResult,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import {
  Header,
  Listing,
  Maybe,
  Message,
  Reservation,
  Review,
  User,
} from './generated/graphql';

export type ApolloFetchMoreType<TData, TVariables> = (<
  K extends keyof TVariables
>(
  fetchMoreOptions: FetchMoreQueryOptions<TVariables, K> &
    FetchMoreOptions<TData, TVariables>
) => Promise<ApolloQueryResult<TData>>) &
  (<K extends keyof TVariables>(
    fetchMoreOptions: {
      query?: DocumentNode;
    } & FetchMoreQueryOptions<TVariables, K> &
      FetchMoreOptions<TData, TVariables>
  ) => Promise<ApolloQueryResult<TData>>);

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NullPartial<T> = {
  [P in keyof T]?: T[P] extends object ? T[P] | null : T[P];
};

export interface AuthFormProps {
  email: string;
  password: string;
}

export interface RegisterFormProps extends AuthFormProps {
  name: string;
  confirm: string;
}

export type ChangePasswordProps = Omit<AuthFormProps, 'email' | 'confirm'>;
export type ForgotPasswordProps = Omit<AuthFormProps, 'password' | 'confirm'>;

export interface ListingFormProps {
  title: string;
  description: string;
  category: string;
  city: string;
  type: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
  highlights: string[];
}

export interface MessageFormProps {
  text: string;
  isFromSender: number;
  headerId: string;
}

export type ActiveElement = {
  active: boolean;
  el: string;
};

export type SearchListingResult = {
  __typename?: 'Listing' | undefined;
} & Pick<
  Listing,
  | 'id'
  | 'title'
  | 'category'
  | 'city'
  | 'photos'
  | 'bathrooms'
  | 'bedrooms'
  | 'beds'
  | 'guests'
  | 'amenities'
  | 'price'
  | 'latitude'
  | 'longitude'
  | 'createdAt'
> & {
    reviews: ({
      __typename?: 'Review' | undefined;
    } & Pick<Review, 'id' | 'rating'>)[];
  };

export type ListingResult = Maybe<
  {
    __typename?: 'Listing' | undefined;
  } & Pick<Listing, 'id' | 'title' | 'city' | 'photos'> & {
      reviews?:
        | Maybe<
            ({
              __typename?: 'Review' | undefined;
            } & Pick<
              Review,
              | 'id'
              | 'rating'
              | 'value'
              | 'cleanliness'
              | 'accuracy'
              | 'checkIn'
              | 'communication'
              | 'location'
              | 'review'
            >)[]
          >
        | undefined;
    } & {
      __typename?: 'Listing' | undefined;
    } & Pick<
      Listing,
      | 'category'
      | 'bathrooms'
      | 'bedrooms'
      | 'beds'
      | 'guests'
      | 'amenities'
      | 'price'
      | 'latitude'
      | 'longitude'
      | 'description'
      | 'type'
    > & {
      creator: {
        __typename?: 'User' | undefined;
      } & {
        __typename?: 'User' | undefined;
      } & Pick<User, 'id' | 'createdAt' | 'name' | 'photoUrl'>;
    }
>;

export type HeaderResult = {
  __typename?: 'Header' | undefined;
} & {
  __typename?: 'Header' | undefined;
} & Pick<
    Header,
    'id' | 'toId' | 'subject' | 'listingId' | 'reservationId' | 'createdAt'
  > & {
    creator: {
      __typename?: 'User' | undefined;
    } & {
      __typename?: 'User' | undefined;
    } & Pick<User, 'id' | 'createdAt' | 'name' | 'photoUrl'>;
    messages: ({
      __typename?: 'Message' | undefined;
    } & {
      __typename?: 'Message' | undefined;
    } & Pick<
        Message,
        'id' | 'createdAt' | 'isFromSender' | 'text' | 'read' | 'headerId'
      > & {
        creator: {
          __typename?: 'User' | undefined;
        } & Pick<User, 'id' | 'name' | 'photoUrl' | 'createdAt'>;
      })[];
  };

export type Reviews =
  | Maybe<
      ({
        __typename?: 'Review' | undefined;
      } & Pick<
        Review,
        | 'id'
        | 'rating'
        | 'value'
        | 'cleanliness'
        | 'accuracy'
        | 'checkIn'
        | 'communication'
        | 'location'
        | 'review'
        | 'createdAt'
      > & {
          creator: {
            __typename?: 'User' | undefined;
          } & Pick<User, 'id' | 'name' | 'photoUrl'>;
        })[]
    >
  | undefined;

export type TripReservation = {
  __typename?: 'Reservation' | undefined;
} & Pick<Reservation, 'cancelled' | 'completed' | 'paymentIntent'> & {
    __typename?: 'Reservation' | undefined;
  } & Pick<
    Reservation,
    'id' | 'arrival' | 'departure' | 'guests' | 'listingId'
  >;
