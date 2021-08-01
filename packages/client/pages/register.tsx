import {
  ControllerProps,
  RegisterFormProps,
  RegisterMutation,
} from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { RegisterViewProps } from '../types';
import { withApollo } from '../utils/withApollo';

const Layout = dynamic(() => import('../components/Layout'));
const RegisterController = dynamic<
  ControllerProps<RegisterMutation, RegisterFormProps>
>(() =>
  import('@second-gear/controller').then((mod) => mod.RegisterController)
);
const RegisterView = dynamic<RegisterViewProps>(() =>
  import('../modules/views/RegisterView').then((mod) => mod.RegisterView)
);

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const onFinish = (): void => {
    router.push('/');
  };

  return (
    <Layout filter room search={false}>
      <RegisterController>
        {({ data, submit }) => (
          <RegisterView data={data} onFinish={onFinish} submit={submit} />
        )}
      </RegisterController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
