import { Form, Select } from 'antd';
import { InputField } from '../../components/InputField';

const { Option } = Select;

interface TextPageProps {}

export const TextPage: React.FC<TextPageProps> = ({}) => {
  return (
    <>
      <InputField
        name='title'
        label='Title'
        rules={[
          {
            required: true,
            message: 'Please add a title!',
          },
          {
            max: 50,
            message: 'That is where you need to stop',
          },
        ]}
        placeholder='e.g. Lovely Studio Flat in the Center of the City'
      />

      <InputField
        name='description'
        label='Description'
        rules={[
          {
            required: true,
            message: 'Please add a description!',
          },
          {
            max: 255,
            message: 'That is where you need to stop',
          },
        ]}
        placeholder='e.g. details to persuade customers'
      />

      <Form.Item
        name='category'
        label='Category'
        rules={[{ required: true, message: 'A category is required' }]}
      >
        <Select style={{ width: 120 }} allowClear>
          <Option value='home'>Home</Option>
          <Option value='apartment'>Apartment</Option>
        </Select>
      </Form.Item>
    </>
  );
};
