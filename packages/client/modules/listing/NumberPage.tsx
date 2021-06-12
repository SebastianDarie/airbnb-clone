import { FloorPlanSchema } from '@airbnb-clone/common';
import { FloorPlanFormProps } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NumberField } from '../../components/Fields/NumberField';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';

export const NumberPage: React.FC<StepForm> = ({
  currPage,
  className,
  nextPage,
  prevPage,
}) => {
  if (currPage !== 2) {
    return null;
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FloorPlanFormProps>({
    defaultValues: {
      beds: 1,
      guests: 4,
      price: 100,
    },
    mode: 'onBlur',
    resolver: yupResolver(FloorPlanSchema),
  });

  const updateForm = useListingStore((state) => state.updateForm);

  return (
    <form onSubmit={handleSubmit((data) => updateForm(data))}>
      <NumberField
        control={control}
        errors={errors}
        name='price'
        label='Price'
        min={1}
        max={1000}
      />
      <NumberField
        control={control}
        errors={errors}
        name='beds'
        label='Beds'
        min={1}
        max={8}
      />
      <NumberField
        control={control}
        errors={errors}
        name='guests'
        label='Guests'
        min={1}
        max={16}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        {currPage < 3 && (
          <button className={className} onClick={nextPage} type='submit'>
            Next
          </button>
        )}
        {currPage > 1 && (
          <button style={{ margin: '0 8px' }} onClick={prevPage}>
            Previous
          </button>
        )}
      </div>
    </form>
  );
};
