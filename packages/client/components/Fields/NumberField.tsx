import { DeepPartial, MinusSvg, PlusSvg } from '@airbnb-clone/controller';
import { ErrorMessage } from '@hookform/error-message';
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import styles from '../../sass/components/GuestsMenu.module.scss';

type NumberFieldProps = {
  control: Control<any>;
  errors: DeepMap<any, FieldError>;
  label: string;
  name: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
} & DeepPartial<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

export const NumberField: React.FC<NumberFieldProps> = ({
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
            <div className={styles.Searchbar__guests__age}>
              <div className={styles.Searchbar__guests__group}>
                <div className={styles.Searchbar__guests__title}>{label}</div>
              </div>
              <div className={styles.Searchbar__guests__input}>
                <button
                  className={styles.Searchbar__guests__minus}
                  disabled
                  type='button'
                >
                  <span className={styles.Searchbar__guests__icon}>
                    <MinusSvg />
                  </span>
                </button>
                <div className={styles.Searchbar__guests__count}>
                  <span>
                    <input type='number' {...field} {...props} />
                  </span>
                  <span className={styles.Searchbar__guests__value__hidden}>
                    {field.value}
                  </span>
                </div>
                <button
                  className={styles.Searchbar__guests__plus}
                  type='button'
                >
                  <span className={styles.Searchbar__guests__icon}>
                    <PlusSvg />
                  </span>
                </button>
              </div>
            </div>
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
