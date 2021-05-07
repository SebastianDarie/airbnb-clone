export interface AuthFormProps {
  email: string;
  password: string;
}

export interface RegisterFormProps extends AuthFormProps {
  confirm: string;
}

export type ChangePasswordProps = Omit<AuthFormProps, 'email' | 'confirm'>;
export type ForgotPasswordProps = Omit<AuthFormProps, 'password' | 'confirm'>;

export interface ListingFormProps {
  title: string;
  description: string;
  category: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}
