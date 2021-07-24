import { ChangePasswordController } from '@airbnb-clone/controller';
import Layout from '../../components/Layout';
import { ChangePasswordView } from '../../modules/views/ChangePasswordView';
import { withApollo } from '../../utils/withApollo';

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  return (
    <Layout>
      <ChangePasswordController>
        {({ data, loading, submit }) => (
          <ChangePasswordView data={data} loading={loading} submit={submit} />
        )}
      </ChangePasswordController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
