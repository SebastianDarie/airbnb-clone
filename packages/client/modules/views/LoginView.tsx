import React from 'react';
import { Form, Button, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { InputField } from '../../components/InputField';
import { FormProps, LoginMutation } from '@airbnb-clone/controller';
import Link from 'next/link';

interface LoginViewProps {
  data?: LoginMutation | null | undefined;
  loading?: boolean;
  submit: (values: FormProps) => Promise<LoginMutation | null | undefined>;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const LoginView: React.FC<LoginViewProps> = React.memo(
  ({ data, loading, submit }) => {
    const [form] = Form.useForm();

    if (data?.login.errors) {
      data.login.errors.map((err) =>
        form.setFields([{ name: err.path, errors: [err.message] }])
      );
    }

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

          <Link href='/'>Forgot password</Link>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            style={{ width: '100%' }}
          >
            Log in
          </Button>
          Or <Link href='/register'>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
);
