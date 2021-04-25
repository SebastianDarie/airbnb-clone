import { ForgotPasswordController } from '@airbnb-clone/controller';
import { Layout } from 'antd';
import { ForgotPasswordView } from '../modules/views/ForgotPasswordView';
import { withApollo } from '../utils/withApollo';

const { Content } = Layout;

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
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
        <ForgotPasswordController>
          {({ loading, submit }) => (
            <ForgotPasswordView loading={loading} submit={submit} />
          )}
        </ForgotPasswordController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
