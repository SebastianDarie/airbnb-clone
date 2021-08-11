import { FetchResult } from '@apollo/client';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
import {
  AuthFormProps,
  ChangePasswordForm,
  ChangePasswordMutation,
  CreatePaymentIntentMutation,
  DeepPartial,
  ForgotPasswordMutation,
  ForgotPasswordProps,
  ListingResult,
  LoginMutation,
  RegisterFormProps,
  RegisterMutation,
  Reviews,
  SearchListingsQuery,
  User,
} from '@second-gear/controller';
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  MutableRefObject,
  RefObject,
  SetStateAction,
} from 'react';
import { Control, DeepMap, FieldError } from 'react-hook-form';

export type AuthViewProps<Mutation, Props> = {
  data?: Mutation | null | undefined;
  loading?: boolean;
  onFinish?: () => void;
  submit: (
    values: Props
  ) => Promise<FetchResult<Mutation, Record<string, any>, Record<string, any>>>;
};

export type ChangePasswordViewProps = AuthViewProps<
  ChangePasswordMutation,
  ChangePasswordForm
>;

export type ForgotPasswordViewProps = AuthViewProps<
  ForgotPasswordMutation,
  ForgotPasswordProps
>;

export type LoginViewProps = AuthViewProps<LoginMutation, AuthFormProps>;

export type RegisterViewProps = AuthViewProps<
  RegisterMutation,
  RegisterFormProps
>;

export type InputFieldProps = {
  control: Control<any>;
  errors: DeepMap<any, FieldError>;
  label: string;
  name: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
} & DeepPartial<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

export interface HighlightProps {
  delay: string;
  styles: {
    readonly [key: string]: string;
  };
  svg: JSX.Element;
  text: string;
  highlights: string[];
}

export interface StripeCardProps {
  clientSecret: CreatePaymentIntentMutation | null | undefined;
  dates: [Date, Date];
  guests: number;
  listing: ListingResult | undefined;
  message: string;
  succeeded: boolean;
  setSucceeded: Dispatch<SetStateAction<boolean>>;
}

export interface DraggablePhotoProps {
  id: string;
  cover: boolean;
  delay: string;
  src: string;
}

export interface RadioButtonProps {
  delay: string;
  option: string;
  description?: string;
  selected: boolean;
  src?: string;
  withImage?: boolean;
}

export interface BookRoomMenuProps {
  id: string;
  avg: number;
  maxGuests: number;
  nights: number;
  price: number;
  roomStyles: {
    readonly [key: string]: string;
  };
}

export interface ReviewsSectionProps {
  avg: number;
  reviews: Reviews;
  reviewsRef: RefObject<HTMLDivElement>;
  styles: {
    readonly [key: string]: string;
  };
}

export interface ProfileSectionProps {
  id: string;
  owner: {
    __typename?: 'User' | undefined;
  } & Pick<User, 'id' | 'name' | 'photoUrl' | 'createdAt'>;
  styles: {
    readonly [key: string]: string;
  };
}

export interface CalendarProps {
  city: string | undefined;
  loading: boolean;
  nights: number;
  styles: {
    readonly [key: string]: string;
  };
}

export interface InfoCardProps {
  data: SearchListingsQuery | undefined;
  selected: MarkerWithLabel;
  styles: {
    readonly [key: string]: string;
  };
  setSelected: (value: SetStateAction<MarkerWithLabel | null>) => void;
}

export interface SearchControlProps {
  checked: boolean;
  loading: boolean;
  controlRef: MutableRefObject<HTMLDivElement | null>;
  setChecked: Dispatch<SetStateAction<boolean>>;
}
