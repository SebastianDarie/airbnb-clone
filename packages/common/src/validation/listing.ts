import * as yup from 'yup';

export const textPageSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Name should be more descriptive')
    .max(50, 'This is where you need to stop')
    .required(),
  description: yup
    .string()
    .max(255, 'This is where you need to stop')
    .required(),
  category: yup.string().required(),
});
