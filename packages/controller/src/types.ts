export interface FormProps {
  email: string;
  password: string;
  confirm?: string;
}

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
