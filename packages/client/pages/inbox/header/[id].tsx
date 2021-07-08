import {
  AirbnbMessageSvg,
  ArchiveSvg,
  CreateMessageController,
  HeadersDocument,
  HeadersQuery,
  SendMessageSvg,
  useCreateMessageMutation,
  useMeQuery,
} from '@airbnb-clone/controller';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ConversationList } from '../../../components/Inbox/ConversationList';
import { ConversationPanel } from '../../../components/Inbox/ConversationPanel';
import Layout from '../../../components/Layout';
import styles from '../../../sass/pages/Header.module.scss';
import roomStyles from '../../../sass/pages/Room.module.scss';
import { useGetHeadersFromUrl } from '../../../shared-hooks/useGetHeadersFromUrl';
import { autosizeTextarea } from '../../../utils/autosizeTextarea';
import { withApollo } from '../../../utils/withApollo';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data, error, variables } = useGetHeadersFromUrl();
  // const [createMessage, { data: messageData }] = useCreateMessageMutation();

  if (!data) {
    return <div>failed to load or loading...</div>;
  }

  const currHeader = data.headers.filter((h) => h.id === variables?.headerId);
  //const newDay = (m, i, arr) => new Date(+arr[i - 1]).getDate() === new Date(+m.createdAt).getDate()

  return (
    <Layout search={false}>
      <div className={styles.inbox__position}>
        <div className={styles.inbox__sections__flex}>
          <ConversationList
            currHeader={currHeader}
            data={data}
            roomStyles={roomStyles}
            styles={styles}
          />

          <CreateMessageController>
            {({ submit }) => (
              <ConversationPanel
                data={data}
                roomStyles={roomStyles}
                styles={styles}
                variables={variables}
                submit={submit}
              />
            )}
          </CreateMessageController>

          <section className={styles.conversation__list__panel}></section>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Header);
