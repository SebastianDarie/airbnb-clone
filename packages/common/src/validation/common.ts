import * as yup from 'yup';

export const emailNotLongEnough = 'E-mail must be at least 3 characters';
export const invalidEmail = 'The input is not a valid E-mail!';
export const requiredEmail = 'An E-mail is required!';
export const emailTooLong = 'The email is too long';

export const emailValidation = yup
  .string()
  .email(invalidEmail)
  .min(3, emailNotLongEnough)
  .max(255, emailTooLong)
  .required(requiredEmail);
