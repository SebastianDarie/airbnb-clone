import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import styles from '../../sass/components/InputField.module.scss';
import { InputFieldProps } from '../../types';

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
