import {
  ChangePasswordForm,
  ChangePasswordMutation,
  ControllerProps,
} from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { ChangePasswordViewProps } from '../../types';
import { withApollo } from '../../utils/withApollo';

interface ChangePasswordProps {}

const Layout = dynamic(() => import('../../components/Layout'));
const ChangePasswordController = dynamic<
  ControllerProps<ChangePasswordMutation, ChangePasswordForm>
>(() =>
  import('@second-gear/controller').then((mod) => mod.ChangePasswordController)
);
const ChangePasswordView = dynamic<ChangePasswordViewProps>(() =>
  import('../../modules/views/ChangePasswordView').then(
    (mod) => mod.ChangePasswordView
  )
);

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  return (
    <Layout>
      <ChangePasswordController>
        {({ data, submit }) => (
          <ChangePasswordView data={data} submit={submit} />
        )}
      </ChangePasswordController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
