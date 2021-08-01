import { ConfirmEmailMutation, ControllerProps } from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { ConfirmEmailViewProps } from '../../types';
import { withApollo } from '../../utils/withApollo';

interface ConfirmEmailProps {}

const Layout = dynamic(() => import('../../components/Layout'));
const ConfirmEmailController = dynamic<
  ControllerProps<ConfirmEmailMutation, string>
>(() =>
  import('@second-gear/controller').then((mod) => mod.ConfirmEmailController)
);
const ConfirmEmailView = dynamic<ConfirmEmailViewProps>(() =>
  import('../../modules/views/ConfirmEmailView').then(
    (mod) => mod.ConfirmEmailView
  )
);

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({}) => {
  return (
    <Layout search={false}>
      <ConfirmEmailController>
        {({ data, loading, submit }) => (
          <ConfirmEmailView data={data} loading={loading} submit={submit} />
        )}
      </ConfirmEmailController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ConfirmEmail);
