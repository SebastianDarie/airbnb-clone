import { Form, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { InputField } from '../../components/InputField';
import { FormProps, RegisterMutation } from '@airbnb-clone/controller';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';

interface RegisterViewProps {
  data?: RegisterMutation | null | undefined;
  loading?: boolean;
  submit: (values: FormProps) => Promise<RegisterMutation | null | undefined>;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  data,
  loading,
  submit,
}) => {
  const [form] = Form.useForm();

  if (data?.register.errors) {
    data.register.errors.map((err) =>
      form.setFields([{ name: err.path, errors: [err.message] }])
    );
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
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

      <InputField
        name='confirm'
        label='Confirm Password'
        dependecies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      />

      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
