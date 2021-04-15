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
  name,
  label,
  dependecies,
  hasFeedback,
  rules,
  placeholder,
  prefix,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      dependencies={dependecies}
      hasFeedback={hasFeedback}
      rules={rules}
    >
      {name === 'password' || name === 'confirm' ? (
        <Input.Password placeholder={placeholder} prefix={prefix} />
      ) : (
        <Input placeholder={placeholder} prefix={prefix} />
      )}
    </Form.Item>
  );
};
