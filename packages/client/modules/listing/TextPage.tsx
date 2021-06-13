import { PropertyTypeSchema } from '@airbnb-clone/common';
import { PropertyTypeFormProps } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/Fields/InputField';
import { LocationField } from '../../components/Fields/LocationField';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';

export const TextPage: React.FC<StepForm> = ({
  currPage,
  className,
  nextPage,
}) => {
  if (currPage !== 1) {
    return null;
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<PropertyTypeFormProps>({
    defaultValues: {
      category: '',
      description: '',
      title: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(PropertyTypeSchema),
  });

  const updateForm = useListingStore((state) => state.updateForm);

  const onSubmit = (data: PropertyTypeFormProps) => {
    console.log('submitting');
    console.log(data);
    updateForm(data);
    nextPage!();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        control={control}
        errors={errors}
        name='title'
        label='Title'
        placeholder=' '
        type='text'
      />

      <InputField
        control={control}
        errors={errors}
        name='description'
        label='Description'
        placeholder=' '
        type='text'
      />

      {/* <Form.Item label='Category' help={errors}>
        <Controller
          control={control}
          name='category'
          render={({ field }) => (
            <Select {...field} style={{ width: 120 }} allowClear>
              <Option value='home'>Home</Option>
              <Option value='apartment'>Apartment</Option>
            </Select>
          )}
        />
      </Form.Item> */}

      {/* <LocationField setValue={setValue} /> */}

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
        <button></button>
      </div>
    </form>
  );
};
