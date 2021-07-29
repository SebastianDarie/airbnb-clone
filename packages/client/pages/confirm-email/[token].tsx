// import { ConfirmEmailController } from '@second-gear/controller';
import Layout from '../../components/Layout';
import { ConfirmEmailView } from '../../modules/views/ConfirmEmailView';
import { withApollo } from '../../utils/withApollo';

interface ConfirmEmailProps {}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({}) => {
  return (
    <Layout search={false}>
      {/* <ConfirmEmailController>
        {({ data, loading, submit }) => (
          <ConfirmEmailView data={data} loading={loading} submit={submit} />
        )}
      </ConfirmEmailController> */}
    </Layout>
  );
};

export default withApollo({ ssr: false })(ConfirmEmail);
