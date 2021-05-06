import * as yup from 'yup';

export const emailNotLongEnough = 'E-mail must be at least 3 characters';
export const passwordNotLongEnough = 'Password must be at least 3 characters';
export const passwordTooLong = 'Password is too long';
export const invalidEmail = 'The input is not a valid E-mail!';

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation,
  confirm: yup
    .string()
    .test('password-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required('Confirm your password'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation,
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation,
});
