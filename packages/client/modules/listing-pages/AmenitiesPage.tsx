import { Form, InputNumber, Select } from 'antd';

const { Option } = Select;

interface AmenitiesPageProps {
  handleChange: (value: any) => void;
}

const children: JSX.Element[] = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option key={i.toString(36) + i} value={i.toString(36) + i}>
      {i.toString(36) + i}
    </Option>
  );
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({
  handleChange,
}) => {
  return (
    <>
      <Form.Item label='Latitude'>
        <InputNumber min={-90} max={90} onChange={handleChange} />
      </Form.Item>
      <Form.Item label='Longitude'>
        <InputNumber min={180} max={180} onChange={handleChange} />
      </Form.Item>

      <Select
        mode='tags'
        style={{ width: '100%' }}
        placeholder='Amenities'
        onChange={handleChange}
      >
        {children}
      </Select>
    </>
  );
};
