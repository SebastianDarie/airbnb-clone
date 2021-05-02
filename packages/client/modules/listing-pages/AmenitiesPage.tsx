import { Form, Select } from 'antd';
import { InputField } from '../../components/InputField';
import { StepForm } from '../../interfaces';

const { Option } = Select;

const children: JSX.Element[] = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option key={i.toString(36) + i} value={i.toString(36) + i}>
      {i.toString(36) + i}
    </Option>
  );
}

export const AmenitiesPage: React.FC<StepForm> = ({ control }) => {
  return (
    <>
      <InputField
        number
        control={control}
        name='latitude'
        label='Latitude'
        min={-90}
        max={90}
        rules={{
          required: 'Please input the latitude of the location',
        }}
      />
      <InputField
        number
        control={control}
        name='longitude'
        label='Longitude'
        min={-180}
        max={180}
        rules={{
          required: 'Please input the longitude of the location',
        }}
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
