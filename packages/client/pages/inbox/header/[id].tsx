import {
  AirbnbMessageSvg,
  ArchiveSvg,
  CreateMessageController,
  HeadersDocument,
  HeadersQuery,
  NewHeaderDocument,
  NewHeaderSubscription,
  NewMessageDocument,
  SendMessageSvg,
  useCreateMessageMutation,
  useHeadersQuery,
  useMeQuery,
} from '@airbnb-clone/controller';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DotLoader } from '../../../components/DotLoader';
import { ConversationDetails } from '../../../components/Inbox/ConversationDetails';
import { ConversationList } from '../../../components/Inbox/ConversationList';
import { ConversationPanel } from '../../../components/Inbox/ConversationPanel';
import Layout from '../../../components/Layout';
import styles from '../../../sass/pages/Header.module.scss';
import roomStyles from '../../../sass/pages/Room.module.scss';
import { autosizeTextarea } from '../../../utils/autosizeTextarea';
import { withApollo } from '../../../utils/withApollo';

interface HeaderProps {}

//type CurrHeader = Omit<Header, 'updatedAt'>;

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  // const {
  //   data,
  //   error,
  //   loading,
  //   variables,
  //   subscribeToMore,
  // } = useGetHeadersFromUrl();
  const { data, loading } = useHeadersQuery();
  const [details, setDetails] = useState(true);
  // const [createMessage, { data: messageData }] = useCreateMessageMutation();

  // const subscribeToNewHeaders = () =>
  //   subscribeToMore<NewHeaderSubscription>({
  //     document: NewHeaderDocument,
  //     variables: { headerId: currHeader[0].id },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newHeader = subscriptionData.data.newHeader;
  //       return Object.assign({}, prev, {
  //         headers: [...prev.headers, newHeader],
  //       });
  //     },
  //   });

  // useEffect(() => {
  //   subscribeToNewHeaders();
  // }, []);

  // if (!data) {
  //   return <div>failed to load or loading...</div>;
  // }

  // const currHeader = data?.headers.filter((h) => h.id === variables?.headerId);
  //const newDay = (m, i, arr) => new Date(+arr[i - 1]).getDate() === new Date(+m.createdAt).getDate()
  const headerId = router.query.id ? router.query.id : '';
  //const currHeader: CurrHeader = data?.headers.filter((h) => h.id === headerId)[0]!;

  return (
    <Layout search={false}>
      <div className={styles.inbox__position}>
        <div className={styles.inbox__sections__flex}>
          <ConversationList
            data={data}
            loading={loading}
            headerId={headerId as string}
            roomStyles={roomStyles}
            styles={styles}
          />

          <CreateMessageController>
            {({ submit }) => (
              <ConversationPanel
                data={data}
                details={details}
                loading={loading}
                headerId={headerId as string}
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
            {!data || loading ? (
              <DotLoader />
            ) : (
              <ConversationDetails
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
