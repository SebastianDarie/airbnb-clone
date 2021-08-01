import {
  ControllerProps,
  CreateMessageMutation,
  MessageFormProps,
  useHeadersQuery,
} from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DotLoader } from '../../../components/DotLoader';
import { ConversationDetails } from '../../../components/Inbox/ConversationDetails';
import { ConversationList } from '../../../components/Inbox/ConversationList';
import { ConversationPanel } from '../../../components/Inbox/ConversationPanel';
import styles from '../../../sass/pages/Header.module.scss';
import roomStyles from '../../../sass/pages/Room.module.scss';
import { withApollo } from '../../../utils/withApollo';

const Layout = dynamic(() => import('../../../components/Layout'));
const CreateMessageController = dynamic<
  ControllerProps<CreateMessageMutation, MessageFormProps>
>(() =>
  import('@second-gear/controller').then((mod) => mod.CreateMessageController)
);

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useHeadersQuery();
  const [details, setDetails] = useState(true);

  const headerId = router.query.id ? router.query.id : '';
  const currHeader = data?.headers.filter((h) => h.id === headerId)[0];

  return (
    <Layout search={false}>
      <div className={styles.inbox__position}>
        <div className={styles.inbox__sections__flex}>
          <ConversationList
            data={data}
            loading={loading}
            currHeader={currHeader}
            roomStyles={roomStyles}
            styles={styles}
          />

          <CreateMessageController>
            {({ submit }) => (
              <ConversationPanel
                data={data}
                details={details}
                loading={loading}
                currHeader={currHeader}
                roomStyles={roomStyles}
                styles={styles}
                setDetails={setDetails}
                submit={submit}
              />
            )}
          </CreateMessageController>

          <section
            className={
              details
                ? styles.conversation__details__panel
                : styles.conversation__details__panel__closed
            }
          >
            {!data || !currHeader || loading ? (
              <DotLoader />
            ) : (
              <ConversationDetails
                currHeader={currHeader}
                details={details}
                roomStyles={roomStyles}
                styles={styles}
              />
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Header);
