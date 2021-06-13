import { LocationSchema } from '@airbnb-clone/common';
import { LocationFormProps } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';

const Amenities: React.FC<StepForm> = ({ className, prevPage }) => {
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
    <form onSubmit={handleSubmit((data) => updateForm(data))}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <button className={className} disabled={isSubmitting} type='submit'>
          Next
        </button>
        <button style={{ margin: '0 8px' }} onClick={prevPage}>
          Back
        </button>
      </div>
    </form>
  );
};

export default Amenities;
