// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { ListingFormProps } from '@airbnb-clone/controller';
import { Control, DeepMap, FieldError } from 'react-hook-form';

export type User = {
  id: number;
  name: string;
};

export interface StepForm {
  control: Control<ListingFormProps>;
  errors: string | undefined;
}
