import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/InputField';
import { StepForm } from '../../interfaces';

const { Option } = Select;

export const TextPage: React.FC<StepForm> = ({ control, errors }) => {
  return (
    <>
      <InputField
        control={control}
        errors={errors[0]}
        name='title'
        label='Title'
        placeholder='e.g. Lovely Studio Flat in the Center of the City'
      />

      <InputField
        control={control}
        errors={errors[1]}
        name='description'
        label='Description'
        placeholder='e.g. details to persuade customers'
      />

      <Form.Item
        label='Category'
        help={errors[2]}
        validateStatus={errors[2] ? 'error' : ''}
      >
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
      </Form.Item>
    </>
  );
};
