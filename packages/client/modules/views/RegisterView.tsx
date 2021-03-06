import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@second-gear/common';
import { RegisterFormProps } from '@second-gear/controller';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/Fields/InputField';
import styles from '../../sass/layout/Form.module.scss';
import { RegisterViewProps } from '../../types';

export const RegisterView: React.FC<RegisterViewProps> = ({
  data,
  onFinish,
  submit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    setError,
  } = useForm<RegisterFormProps>({
    defaultValues: { confirm: '', email: '', name: '', password: '' },
    mode: 'onBlur',
    resolver: yupResolver(registerSchema as any),
  });

  useEffect(() => {
    if (data?.register.errors) {
      data.register.errors.map((err) =>
        setError(err.path as 'name' | 'email' | 'password' | 'confirm', {
          type: 'server',
          message: err.message,
        })
      );
    } else if (data?.register.user && onFinish) {
      onFinish();
    }
  }, [data?.register.errors]);

  return (
    <div className={styles.center}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit((data) => submit(data))}>
        <InputField
          control={control}
          errors={errors}
          label='Name'
          name='name'
          placeholder=' '
        />

        <InputField
          control={control}
          errors={errors}
          label='E-mail'
          name='email'
          placeholder=' '
          type='email'
        />

        <InputField
          control={control}
          errors={errors}
          label='Password'
          name='password'
          placeholder=' '
        />

        <InputField
          control={control}
          errors={errors}
          label='Confirm Password'
          name='confirm'
          placeholder=' '
        />

        <input
          type='submit'
          value='Register'
          className={styles.submit}
          disabled={!isDirty || isSubmitting || !isValid}
        />
      </form>
    </div>
  );
};
