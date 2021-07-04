import * as yup from 'yup';
import { emailValidation } from './common';

export const passwordNotLongEnough = 'Password must be at least 3 characters';
export const passwordTooLong = 'Password is too long';

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const registerSchema = yup.object().shape({
  email: emailValidation,
  password: registerPasswordValidation,
  confirm: yup
    .string()
    .test('password-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required('Confirm your password'),
});

export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: registerPasswordValidation,
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation,
});

export const forgotPasswordSchema = yup.object().shape({
  email: emailValidation,
});
