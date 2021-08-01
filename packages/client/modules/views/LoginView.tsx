import { AuthFormProps } from '@second-gear/controller';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import styles from '../../sass/layout/Form.module.scss';
import dynamic from 'next/dynamic';
import { InputFieldProps, LoginViewProps } from '../../types';
import { loginSchema } from '@second-gear/common';

const InputField = dynamic<InputFieldProps>(() =>
  import('../../components/Fields/InputField').then((mod) => mod.InputField)
);
const Link = dynamic(() => import('next/link'));

export const LoginView: React.FC<LoginViewProps> = ({
  data,
  onFinish,
  submit,
}) => {
  const {
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    setError,
  } = useForm<AuthFormProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(loginSchema as any),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (data?.login.errors) {
      data.login.errors.map((err) =>
        setError(err.path as 'email' | 'password', {
          type: 'server',
          message: err.message,
        })
      );
    } else if (data?.login.user && onFinish) {
      onFinish();
    }
  }, [data?.login.errors]);

  return (
    <div className={styles.center}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submit)}>
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
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          label='Password'
          name='password'
          placeholder=' '
          type={showPassword ? 'text' : 'password'}
        />

        <Link href='/forgot-password'>
          <a style={{ marginTop: '1rem' }}>Forgot Password?</a>
        </Link>
        <input
          type='submit'
          value='Login'
          className={styles.submit}
          disabled={!isDirty || isSubmitting || !isValid}
        />
        <div className={styles.signup__link}>
          Not a member?{' '}
          <Link href='/register'>
            <a>Register now!</a>
          </Link>
        </div>
      </form>
    </div>
  );
};
