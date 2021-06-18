import { LocationSchema } from '@airbnb-clone/common';
import { LocationFormProps } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';

const Amenities: React.FC<StepForm> = ({}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<LocationFormProps>({
    defaultValues: {
      amenities: [''],
      latitude: 40,
      longitude: -74.5,
    },
    mode: 'onBlur',
    resolver: yupResolver(LocationSchema),
  });

  const updateForm = useListingStore((state) => state.updateForm);

  return (
    <CreateListingLayout>
      <form onSubmit={handleSubmit((data) => updateForm(data))}></form>
    </CreateListingLayout>
  );
};

export default Amenities;
