import { Card, Layout } from 'antd';
import { withApollo } from '../utils/withApollo';

const { Meta } = Card;
const { Content } = Layout;

interface ConfirmationProps {}

const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Card hoverable style={{ width: 240 }}>
          <Meta title='Test title' description='test description' />
        </Card>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Confirmation);
