import {
  AuthFormProps,
  ControllerProps,
  LoginMutation,
} from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { LoginViewProps } from '../types';
import { withApollo } from '../utils/withApollo';

interface LoginProps {}

const Layout = dynamic(() => import('../components/Layout'));
const LoginController = dynamic<ControllerProps<LoginMutation, AuthFormProps>>(
  () => import('@second-gear/controller').then((mod) => mod.LoginController)
);
const LoginView = dynamic<LoginViewProps>(() =>
  import('../modules/views/LoginView').then((mod) => mod.LoginView)
);

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();

  const onFinish = (): void => {
    if (typeof router.query.next === 'string') {
      router.push(router.query.next);
    } else {
      router.push('/');
    }
  };

  return (
    <Layout search={false}>
      <LoginController>
        {({ data, submit }) => (
          <LoginView data={data} onFinish={onFinish} submit={submit} />
        )}
      </LoginController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
