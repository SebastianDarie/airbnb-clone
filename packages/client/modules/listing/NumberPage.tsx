import { InputField } from '../../components/InputField';
import { StepForm } from '../../interfaces';

export const NumberPage: React.FC<StepForm> = ({ control, errors }) => {
  return (
    <>
      <InputField
        number
        control={control}
        errors={errors[0]}
        name='price'
        label='Price'
        min={1}
        max={10000}
      />
      <InputField
        number
        control={control}
        errors={errors[1]}
        name='beds'
        label='Beds'
        min={1}
        max={8}
      />
      <InputField
        number
        control={control}
        errors={errors[2]}
        name='guests'
        label='Guests'
        min={1}
        max={16}
      />
    </>
  );
};
