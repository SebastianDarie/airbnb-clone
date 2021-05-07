import { Form, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { InputField } from '../../components/InputField';
import { RegisterFormProps, RegisterMutation } from '@airbnb-clone/controller';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@airbnb-clone/common';
import { useEffect } from 'react';

interface RegisterViewProps {
  data?: RegisterMutation | null | undefined;
  loading?: boolean;
  submit: (
    values: RegisterFormProps
  ) => Promise<RegisterMutation | null | undefined>;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  data,
  loading,
  submit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    setError,
  } = useForm<RegisterFormProps>({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (data?.register.errors) {
      data.register.errors.map((err) =>
        setError(err.path as 'email' | 'password' | 'confirm', {
          type: 'server',
          message: err.message,
        })
      );
    }
  }, [data?.register.errors]);

  return (
    <Form
      {...formItemLayout}
      name='register'
      onFinish={handleSubmit((data) => submit(data))}
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

      <InputField
        control={control}
        errors={errors.confirm?.message}
        name='confirm'
        label='Confirm Password'
        dependecies={['password']}
        hasFeedback
      />

      <Form.Item {...tailFormItemLayout}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={!isDirty || !isValid}
          loading={loading || isSubmitting}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
