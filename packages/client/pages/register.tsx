import { Layout } from 'antd';
import { RegisterView } from '../modules/views/RegisterView';
import { withApollo } from '../utils/withApollo';

const { Content } = Layout;

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Layout>
      <Content
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2rem',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <RegisterView />
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
