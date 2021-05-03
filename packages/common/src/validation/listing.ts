import * as yup from 'yup';

export const textPageSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Name should be more descriptive')
    .max(50, 'This is where you need to stop')
    .required('Every house has a name'),
  description: yup
    .string()
    .max(255, 'This is where you need to stop')
    .required('A descrition is needed'),
  category: yup.string().required('Please choose one category'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Name your price'),
  beds: yup
    .number()
    .typeError('Number of beds must be a number')
    .required('Every house has at least 1 bed'),
  guests: yup
    .number()
    .typeError('Number of guests must be a number')
    .required('How many guests?'),
  latitude: yup
    .number()
    .typeError('Latitude must be a number')
    .required('Please input the latitude of the location'),
  longitude: yup
    .number()
    .typeError('Longitude must be a number')
    .required('Please input the longitude of the location'),
  amenities: yup
    .array()
    .of(yup.string())
    .required('At least one amenity should be added'),
});
