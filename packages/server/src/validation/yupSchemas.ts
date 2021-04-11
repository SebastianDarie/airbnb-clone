import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('That is not a valid email')
    .max(255, 'That is too much'),
  password: yup
    .string()
    .min(3, 'Needs to be more secure')
    .max(256, 'Make it shorter'),
});
