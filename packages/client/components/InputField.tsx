import { DeepPartial } from '@airbnb-clone/controller';
import { Form, Input, InputNumber } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from '../sass/components/InputField.module.scss';

type InputFieldProps = {
  control: Control<any>;
  errors: DeepMap<any, FieldError>;
  label: string;
  name: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
} & DeepPartial<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

export const InputField: React.FC<InputFieldProps> = ({
  control,
  errors,
  label,
  name,
  showPassword,
  setShowPassword,
  ...props
}) => {
  return (
    <>
      <div className={styles.field}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <input
                {...field}
                {...props}
                className={styles.input}
                // placeholder=''
                // onBlur={(e) => {
                //   e.target.placeholder = '';
                // }}
                // onFocus={(e) => {
                //   e.target.placeholder = props.placeholder!;
                // }}
              />
              <label className={styles.label}>{label}</label>
              {name === 'password' && setShowPassword ? (
                <span
                  className={styles.toggle__password}
                  onMouseEnter={() => setShowPassword(true)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              ) : null}
            </>
          )}
        />
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className={styles.err__message}>{message}</p>
        )}
      />
    </>
  );
};
