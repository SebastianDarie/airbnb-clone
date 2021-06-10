import { InputField } from '../../components/InputField';
import { AuthFormProps, LoginMutation } from '@airbnb-clone/controller';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@airbnb-clone/common';
import { useEffect, useState } from 'react';
import styles from '../../sass/pages/Auth.module.scss';

interface LoginViewProps {
  data?: LoginMutation | null | undefined;
  loading?: boolean;
  submit: (values: AuthFormProps) => Promise<LoginMutation | null | undefined>;
}

export const LoginView: React.FC<LoginViewProps> = ({
  data,
  loading,
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
    resolver: yupResolver(loginSchema),
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
    }
  }, [data?.login.errors]);

  // console.log(errors);

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
