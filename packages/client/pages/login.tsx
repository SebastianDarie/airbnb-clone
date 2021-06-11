import { LoginController } from '@airbnb-clone/controller';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { LoginView } from '../modules/views/LoginView';
import { withApollo } from '../utils/withApollo';

interface LoginProps {}

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
        {({ data, loading, submit }) => (
          <LoginView
            data={data}
            loading={loading}
            onFinish={onFinish}
            submit={submit}
          />
        )}
      </LoginController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
