import { LoginController } from '@airbnb-clone/controller';
import Layout from '../components/Layout';
import { LoginView } from '../modules/views/LoginView';
import { withApollo } from '../utils/withApollo';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  return (
    <Layout search={false}>
      <LoginController>
        {({ data, loading, submit }) => (
          <LoginView data={data} loading={loading} submit={submit} />
        )}
      </LoginController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
