import { Form, Input, InputNumber } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

interface InputFieldProps {
  control: Control<any>;
  errors?: any;
  name: string;
  label: ReactNode;
  dependecies?: NamePath[] | undefined;
  hasFeedback?: boolean | undefined;
  placeholder?: string | undefined;
  prefix?: ReactNode;
  number?: boolean;
  min?: number;
  max?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  control,
  errors,
  name,
  label,
  dependecies,
  hasFeedback,
  placeholder,
  prefix,
  number,
  ...props
}) => {
  return (
    <Form.Item
      label={label}
      dependencies={dependecies}
      hasFeedback={hasFeedback}
      help={errors}
      validateStatus={errors ? 'error' : ''}
    >
      {name === 'password' || name === 'confirm' ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder={placeholder}
              prefix={prefix}
            />
          )}
        />
      ) : number ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => <InputNumber {...field} {...props} />}
        />
      ) : (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <Input {...field} placeholder={placeholder} prefix={prefix} />
            </>
          )}
        />
      )}
    </Form.Item>
  );
};
