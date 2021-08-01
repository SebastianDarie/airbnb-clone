import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@second-gear/common';
import { ChangePasswordProps } from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../sass/layout/Form.module.scss';
import { ChangePasswordViewProps, InputFieldProps } from '../../types';

const InputField = dynamic<InputFieldProps>(() =>
  import('../../components/Fields/InputField').then((mod) => mod.InputField)
);

export const ChangePasswordView: React.FC<ChangePasswordViewProps> = ({
  data,
  submit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    setError,
  } = useForm<ChangePasswordProps>({
    mode: 'onBlur',
    resolver: yupResolver(changePasswordSchema as any),
  });

  useEffect(() => {
    if (data?.changePassword.errors) {
      data.changePassword.errors.map((err) =>
        setError(err.path as 'password', {
          type: 'server',
          message: err.message,
        })
      );
    }
  }, [data?.changePassword.errors]);

  return (
    <div className={styles.center}>
      <form
        name='change-password'
        onSubmit={handleSubmit((data) =>
          submit({ password: data.password, token: '' })
        )}
      >
        <InputField
          control={control}
          errors={errors}
          label='Password'
          name='password'
          placeholder=' '
        />

        <input
          type='submit'
          value='Change Password'
          className={styles.submit}
          disabled={!isDirty || isSubmitting || !isValid}
        />
      </form>
    </div>
  );
};
