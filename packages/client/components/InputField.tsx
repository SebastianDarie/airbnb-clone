import { ReactNode } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  RegisterOptions,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface InputFieldProps {
  control: Control<any>;
  errors?: string | undefined;
  name: string;
  label: ReactNode;
  dependecies?: NamePath[] | undefined;
  hasFeedback?: boolean | undefined;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
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
  rules,
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
      validateStatus={!!errors}
      //rules={rules}
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
          render={({ field, formState: { errors } }) => (
            <>
              <Input {...field} placeholder={placeholder} prefix={prefix} />
              {/* <ErrorMessage
                errors={errors}
                name={name}
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              /> */}
            </>
          )}
          rules={rules}
        />
      )}
    </Form.Item>
  );
};
