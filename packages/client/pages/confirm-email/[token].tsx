import { ConfirmEmailController } from '@airbnb-clone/controller';
import { Layout } from 'antd';
import { ConfirmEmailView } from '../../modules/views/ConfirmEmailView';
import { withApollo } from '../../utils/withApollo';

const { Content } = Layout;

interface ConfirmEmailProps {}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({}) => {
  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <ConfirmEmailController>
          {({ data, loading, submit }) => (
            <ConfirmEmailView data={data} loading={loading} submit={submit} />
          )}
        </ConfirmEmailController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ConfirmEmail);
