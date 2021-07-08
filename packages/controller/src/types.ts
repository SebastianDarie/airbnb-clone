import {
  FetchMoreQueryOptions,
  FetchMoreOptions,
  ApolloQueryResult,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

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
