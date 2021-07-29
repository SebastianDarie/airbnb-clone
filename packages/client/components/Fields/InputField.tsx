import { DeepPartial } from '@second-gear/controller';
import { ErrorMessage } from '@hookform/error-message';
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import styles from '../../sass/components/InputField.module.scss';

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
              <input {...field} {...props} className={styles.input} />
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
