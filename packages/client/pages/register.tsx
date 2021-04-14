import { Layout } from 'antd';
import { RegisterController } from '@airbnb-clone/controller';
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
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <RegisterController>
          {({ submit }) => <RegisterView submit={submit} />}
        </RegisterController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
