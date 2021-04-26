import { ChangePasswordController } from '@airbnb-clone/controller';
import { Layout } from 'antd';
import { ChangePasswordView } from '../../modules/views/ChangePasswordView';
import { withApollo } from '../../utils/withApollo';

const { Content } = Layout;

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
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
        <ChangePasswordController>
          {({ data, loading, submit }) => (
            <ChangePasswordView data={data} loading={loading} submit={submit} />
          )}
        </ChangePasswordController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
