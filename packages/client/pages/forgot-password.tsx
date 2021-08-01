import {
  ControllerProps,
  ForgotPasswordMutation,
  ForgotPasswordProps,
} from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { ForgotPasswordViewProps } from '../types';
import { withApollo } from '../utils/withApollo';

const ForgotPasswordController = dynamic<
  ControllerProps<ForgotPasswordMutation, ForgotPasswordProps>
>(() =>
  import('@second-gear/controller').then((mod) => mod.ForgotPasswordController)
);
const ForgotPasswordView = dynamic<ForgotPasswordViewProps>(() =>
  import('../modules/views/ForgotPasswordView').then(
    (mod) => mod.ForgotPasswordView
  )
);
const Layout = dynamic(() => import('../components/Layout'));

const ForgotPassword: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <ForgotPasswordController>
        {({ submit }) => <ForgotPasswordView submit={submit} />}
      </ForgotPasswordController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
