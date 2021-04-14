import { ReactNode } from 'react';
import { Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';

interface InputFieldProps {
  name: NamePath;
  label: ReactNode;
  dependecies?: NamePath[] | undefined;
  hasFeedback?: boolean | undefined;
  rules?: Rule[] | undefined;
  placeholder?: string | undefined;
  prefix?: ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  prefix,
  ...props
}) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={placeholder} prefix={prefix} />
    </Form.Item>
  );
};
