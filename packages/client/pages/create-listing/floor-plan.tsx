import { FloorPlanSchema } from '@airbnb-clone/common';
import { FloorPlanFormProps } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NumberField } from '../../components/Fields/NumberField';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';
import shallow from 'zustand/shallow';

const FloorPlan: React.FC<StepForm> = ({
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

  const [beds, guests, price] = useListingStore(
    (state) => [state.price, state.beds, state.guests],
    shallow
  );
  const updateForm = useListingStore((state) => state.updateForm);
  console.log(beds, guests, price);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateForm(data);
        nextPage!();
      })}
    >
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
        <button className={className} disabled={isSubmitting} type='submit'>
          Next
        </button>
        <button style={{ margin: '0 8px' }} onClick={prevPage}>
          Previous
        </button>
      </div>
    </form>
  );
};

export default FloorPlan;
