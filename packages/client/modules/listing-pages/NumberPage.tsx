import { Form, InputNumber } from 'antd';

interface NumberPageProps {
  handleChange: (value: any) => void;
}

export const NumberPage: React.FC<NumberPageProps> = ({ handleChange }) => {
  return (
    <>
      <Form.Item label='Price'>
        <InputNumber min={1} max={10000} onChange={handleChange} />
      </Form.Item>
      <Form.Item label='Beds'>
        <InputNumber min={1} max={8} onChange={handleChange} />
      </Form.Item>
      <Form.Item label='Guests'>
        <InputNumber min={1} max={16} onChange={handleChange} />
      </Form.Item>
    </>
  );
};
