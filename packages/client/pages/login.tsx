import { LoginController } from '@airbnb-clone/controller';
import { Layout } from 'antd';
import { LoginView } from '../modules/views/LoginView';
import { withApollo } from '../utils/withApollo';

const { Content } = Layout;

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <LoginController>
          {({ data, loading, submit }) => (
            <LoginView data={data} loading={loading} submit={submit} />
          )}
        </LoginController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
