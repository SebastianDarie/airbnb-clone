import { changePasswordSchema } from '@second-gear/common';
import {
  ChangePasswordMutation,
  ChangePasswordProps,
} from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/Fields/InputField';
import styles from '../../sass/layout/Form.module.scss';

interface ChangePasswordViewProps {
  data?: ChangePasswordMutation | null | undefined;
  loading?: boolean;
  submit: (values: ChangePasswordProps) => Promise<boolean>;
}

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
    resolver: yupResolver(changePasswordSchema),
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
    <form
      className={styles.center}
      name='change-password'
      onSubmit={handleSubmit((data) => submit(data))}
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
  );
};
