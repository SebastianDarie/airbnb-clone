import { useRouter } from 'next/router';
import styles from '../../sass/layout/Form.module.scss';
import { ConfirmEmailViewProps } from '../../types';

export const ConfirmEmailView: React.FC<ConfirmEmailViewProps> = ({
  data,
  submit,
}) => {
  const router = useRouter();

  if (data && !data.confirmEmail.errors) {
    router.push('/login');
  }

  return (
    <div className={styles.center}>
      <form onSubmit={() => submit('')}>
        <input type='submit' value='Confirm Email' className={styles.submit} />
      </form>
    </div>
  );
};
