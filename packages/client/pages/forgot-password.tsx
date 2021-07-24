import { ForgotPasswordController } from '@airbnb-clone/controller';
import Layout from '../components/Layout';
import { ForgotPasswordView } from '../modules/views/ForgotPasswordView';
import { withApollo } from '../utils/withApollo';

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  return (
    <Layout>
      <ForgotPasswordController>
        {({ submit }) => <ForgotPasswordView submit={submit} />}
      </ForgotPasswordController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
