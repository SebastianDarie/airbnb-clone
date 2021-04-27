import { ConfirmEmailMutation } from '@airbnb-clone/controller';
import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';

interface ConfirmEmailViewProps {
  data?: ConfirmEmailMutation | null | undefined;
  loading?: boolean;
  submit: () => Promise<boolean>;
}

export const ConfirmEmailView: React.FC<ConfirmEmailViewProps> = ({
  data,
  loading,
  submit,
}) => {
  const router = useRouter();

  if (data && !data.confirmEmail.errors) {
    router.push('/login');
  }

  return (
    <Button
      type='primary'
      htmlType='submit'
      loading={loading}
      style={{ width: '100%' }}
      onClick={submit}
    >
      Confirm Email
    </Button>
  );
};
