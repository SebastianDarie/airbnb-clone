import { forgotPasswordSchema } from '@airbnb-clone/common';
import { ForgotPasswordProps } from '@airbnb-clone/controller';
import { UserOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/Fields/InputField';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';

interface ForgotPasswordViewProps {
  loading?: boolean;
  submit: (values: ForgotPasswordProps) => Promise<boolean>;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  loading,
  submit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<ForgotPasswordProps>({
    mode: 'onBlur',
    resolver: yupResolver(forgotPasswordSchema),
  });

  return (
    <Form
      {...formItemLayout}
      name='forgot-password'
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

      <Form.Item {...tailFormItemLayout}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={!isDirty || !isValid}
          loading={loading || isSubmitting}
          style={{ width: '100%' }}
        >
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};
