import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/InputField';
import { StepForm } from '../../interfaces';

export const AmenitiesPage: React.FC<StepForm> = ({ control, errors }) => {
  return (
    <>
      <InputField
        number
        control={control}
        errors={errors[0]}
        name='latitude'
        label='Latitude'
        min={-90}
        max={90}
      />
      <InputField
        number
        control={control}
        errors={errors[1]}
        name='longitude'
        label='Longitude'
        min={-180}
        max={180}
      />

      <Form.Item
        label='Amenities'
        help={errors[2]}
        validateStatus={errors[2] ? 'error' : ''}
      >
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
      </Form.Item>
    </>
  );
};
