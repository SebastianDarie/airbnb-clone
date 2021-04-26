import { ChangePasswordMutation, FormProps } from '@airbnb-clone/controller';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { InputField } from '../../components/InputField';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';

interface ChangePasswordViewProps {
  data?: ChangePasswordMutation | null | undefined;
  loading?: boolean;
  submit: (values: FormProps) => Promise<boolean>;
}

export const ChangePasswordView: React.FC<ChangePasswordViewProps> = ({
  loading,
  submit,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='login'
      initialValues={{ remember: true }}
      onFinish={submit}
      scrollToFirstError
    >
      <InputField
        name='password'
        label='Password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 3,
            message: 'Password must be at least 3 characters',
          },
          {
            max: 256,
            message: 'That is where you need to stop',
          },
        ]}
        hasFeedback
        placeholder='e.g. secret-password'
        prefix={<LockOutlined />}
      />

      <Form.Item {...tailFormItemLayout}>
        <Button
          type='primary'
          htmlType='submit'
          loading={loading}
          style={{ width: '100%' }}
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};
