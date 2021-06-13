import { LocationSchema } from '@airbnb-clone/common';
import { LocationFormProps } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NumberField } from '../../components/Fields/NumberField';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';

export const AmenitiesPage: React.FC<StepForm> = ({
  currPage,
  className,
  prevPage,
}) => {
  if (currPage !== 3) {
    return null;
  }

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
      <NumberField
        control={control}
        errors={errors}
        name='latitude'
        label='Latitude'
        min={-90}
        max={90}
      />
      <NumberField
        control={control}
        errors={errors}
        name='longitude'
        label='Longitude'
        min={-180}
        max={180}
      />

      {/* <Form.Item label='Amenities' help={errors}>
        <Controller
          control={control}
          name='amenities'
          render={({ field }) => (
            <Select
              {...field}
              mode='tags'
              style={{ width: '100%' }}
              placeholder='Amenities'
            />
          )}
        />
      </Form.Item> */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <button className={className} disabled={isSubmitting} type='submit'>
          Create Listing
        </button>
        <button style={{ margin: '0 8px' }} onClick={prevPage}>
          Previous
        </button>
      </div>
    </form>
  );
};
