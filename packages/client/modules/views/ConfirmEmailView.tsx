import { ConfirmEmailMutation } from '@airbnb-clone/controller';
import { useRouter } from 'next/router';

interface ConfirmEmailViewProps {
  data?: ConfirmEmailMutation | null | undefined;
  loading?: boolean;
  submit: () => Promise<boolean>;
}

export const ConfirmEmailView: React.FC<ConfirmEmailViewProps> = ({
  data,
  submit,
}) => {
  const router = useRouter();

  if (data && !data.confirmEmail.errors) {
    router.push('/login');
  }

  return (
    <button type='submit' onClick={submit}>
      Confirm Email
    </button>
  );
};
