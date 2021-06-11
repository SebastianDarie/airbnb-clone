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
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
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

  const title = useListingStore((state) => state.title);
  const updateForm = useListingStore((state) => state.updateForm);

  if (currPage !== 1) {
    return null;
  }
  //console.log(title);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        updateForm(data);
        if (nextPage) {
          nextPage();
        }
      })}
    >
      <InputField
        control={control}
        errors={errors}
        name='title'
        label='Title'
        placeholder=' '
      />

      <InputField
        control={control}
        errors={errors}
        name='description'
        label='Description'
        placeholder=' '
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
        {currPage < 3 && (
          <input className={className} type='submit' value='Next' />
        )}
      </div>
    </form>
  );
};
