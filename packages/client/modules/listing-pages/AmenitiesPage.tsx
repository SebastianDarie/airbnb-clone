import { Form, Select } from 'antd';
import { InputField } from '../../components/InputField';

const { Option } = Select;

interface AmenitiesPageProps {}

const children: JSX.Element[] = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option key={i.toString(36) + i} value={i.toString(36) + i}>
      {i.toString(36) + i}
    </Option>
  );
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({}) => {
  return (
    <>
      <InputField number name='latitude' label='Latitude' min={-90} max={90} />
      <InputField
        number
        name='longitude'
        label='Longitude'
        min={-180}
        max={180}
      />

      <Form.Item
        name='amenities'
        label='Amenities'
        rules={[
          { required: true, message: 'At least one amenity should be added' },
        ]}
      >
        <Select mode='tags' style={{ width: '100%' }} placeholder='Amenities'>
          {children}
        </Select>
      </Form.Item>
    </>
  );
};
