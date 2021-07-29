import { RegisterController } from '@second-gear/controller';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { RegisterView } from '../modules/views/RegisterView';
import { withApollo } from '../utils/withApollo';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const onFinish = (): void => {
    router.push('/');
  };

  return (
    <Layout filter room search={false}>
      <RegisterController>
        {({ data, loading, submit }) => (
          <RegisterView
            data={data}
            loading={loading}
            onFinish={onFinish}
            submit={submit}
          />
        )}
      </RegisterController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
