import { Form, Button, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { InputField } from '../../components/InputField';
import { AuthFormProps, LoginMutation } from '@airbnb-clone/controller';
import Link from 'next/link';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@airbnb-clone/common';
import { useEffect } from 'react';

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
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    setError,
  } = useForm<AuthFormProps>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

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

  return (
    <Form
      {...formItemLayout}
      name='login'
      initialValues={{ remember: true }}
      onFinish={handleSubmit((values) => submit(values))}
      scrollToFirstError
    >
      <InputField
        control={control}
        errors={errors.email?.message}
        name='email'
        label='E-mail'
        placeholder='e.g. bob@bob.com'
        prefix={<UserOutlined />}
      />
      <InputField
        control={control}
        errors={errors.password?.message}
        name='password'
        label='Password'
        hasFeedback
        placeholder='e.g. secret-password'
        prefix={<LockOutlined />}
      />

      <Form.Item
        style={{
          marginLeft: 133,
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link href='/forgot-password'>Forgot password</Link>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={!isDirty || !isValid}
          loading={loading || isSubmitting}
          style={{ width: '100%' }}
        >
          Log in
        </Button>
        Or <Link href='/register'>register now!</Link>
      </Form.Item>
    </Form>
  );
};
