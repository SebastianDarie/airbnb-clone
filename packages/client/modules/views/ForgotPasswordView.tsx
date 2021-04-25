import { FormProps } from '@airbnb-clone/controller';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { InputField } from '../../components/InputField';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';

interface ForgotPasswordViewProps {
  loading?: boolean;
  submit: (values: FormProps) => Promise<boolean>;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
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
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
          {
            max: 255,
            message: 'That is where you need to stop',
          },
        ]}
        placeholder='e.g. bob@bob.com'
        prefix={<UserOutlined />}
      />

      <Form.Item {...tailFormItemLayout}>
        <Button
          type='primary'
          htmlType='submit'
          loading={loading}
          style={{ width: '100%' }}
        >
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};
