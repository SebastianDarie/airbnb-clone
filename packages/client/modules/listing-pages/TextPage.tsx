import { Form, Select } from 'antd';
import { InputField } from '../../components/InputField';
import { StepForm } from '../../interfaces';

const { Option } = Select;

export const TextPage: React.FC<StepForm> = ({ control, errors }) => {
  return (
    <>
      <InputField
        control={control}
        errors={errors}
        name='title'
        label='Title'
        rules={{
          required: 'Please add a name!',
          maxLength: { message: 'This is where you need to stop', value: 50 },
        }}
        placeholder='e.g. Lovely Studio Flat in the Center of the City'
      />

      <InputField
        control={control}
        errors={errors}
        name='description'
        label='Description'
        rules={{
          required: 'Please add a description!',

          maxLength: {
            message: 'That is where you need to stop',
            value: 255,
          },
        }}
        placeholder='e.g. details to persuade customers'
      />

      <Form.Item
        name='category'
        label='Category'
        //rules={[{ required: true, message: 'A category is required' }]}
      >
        <Select style={{ width: 120 }} allowClear>
          <Option value='home'>Home</Option>
          <Option value='apartment'>Apartment</Option>
        </Select>
      </Form.Item>
    </>
  );
};
