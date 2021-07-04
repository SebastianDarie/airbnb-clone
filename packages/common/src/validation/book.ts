import * as yup from 'yup';
import { emailValidation } from './common';

export const paymentSchema = yup.object().shape({
  email: emailValidation,
  name: yup
    .string()
    .min(3, 'Full name cannot be shorter')
    .max(255, 'What kind of name do you have?')
    .required('Everyone has a name'),
  phone: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid'
    ),
});
