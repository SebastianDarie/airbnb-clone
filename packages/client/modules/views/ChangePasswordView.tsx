import { changePasswordSchema } from '@airbnb-clone/common';
import {
  ChangePasswordMutation,
  ChangePasswordProps,
} from '@airbnb-clone/controller';
import { LockOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/InputField';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';

interface ChangePasswordViewProps {
  data?: ChangePasswordMutation | null | undefined;
  loading?: boolean;
  submit: (values: ChangePasswordProps) => Promise<boolean>;
}

export const ChangePasswordView: React.FC<ChangePasswordViewProps> = ({
  data,
  loading,
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
    <Form
      {...formItemLayout}
      name='change-password'
      onFinish={handleSubmit((data) => submit(data))}
      scrollToFirstError
    >
      <InputField
        control={control}
        errors={errors.password?.message}
        name='password'
        label='Password'
        hasFeedback
        placeholder='e.g. secret-password'
        prefix={<LockOutlined />}
      />

      <Form.Item {...tailFormItemLayout}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={!isDirty || !isValid}
          loading={loading || isSubmitting}
          style={{ width: '100%' }}
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};
