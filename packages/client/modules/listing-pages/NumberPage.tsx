import { InputField } from '../../components/InputField';
import { StepForm } from '../../interfaces';

export const NumberPage: React.FC<StepForm> = ({ control }) => {
  return (
    <>
      <InputField
        number
        control={control}
        name='price'
        label='Price'
        min={1}
        max={10000}
        rules={{
          required: 'Name your price',
        }}
      />
      <InputField
        number
        control={control}
        name='beds'
        label='Beds'
        min={1}
        max={8}
        rules={{
          required: 'Every house has at least 1 bed',
        }}
      />
      <InputField
        number
        control={control}
        name='guests'
        label='Guests'
        min={1}
        max={16}
        rules={{
          required: 'How many guests?',
        }}
      />
    </>
  );
};
