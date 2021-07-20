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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  if (data) {
    console.log(data?.headers[0]?.creator, data?.headers[0]?.toId);
  }
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
                loading={loading}
                headerId={headerId as string}
                roomStyles={roomStyles}
                styles={styles}
                submit={submit}
              />
            )}
          </CreateMessageController>

          <section className={styles.conversation__list__panel}>
            {!data || loading ? (
              <span className={styles.dot__loader}>
                <span
                  className={styles.dot}
                  style={{ animationDelay: '-0.3s' }}
                ></span>
                <span
                  className={styles.dot}
                  style={{ animationDelay: '-0.15s' }}
                ></span>
                <span className={styles.dot}></span>
              </span>
            ) : (
              <div className={styles.reservation__position}>
                <div className={styles.reservation__details__margin}>
                  <div className={styles.reservation__control__padding}>
                    <div className={styles.reservation__details__text}></div>
                  </div>
                </div>

                <div className={styles.reservation__padding}>
                  <div className={roomStyles.room__section__flex}>
                    <div className={styles.reservation__header}>
                      <div className={styles.reservation__header__table}>
                        <div className={styles.header__cell}>
                          <div className={styles.header__firstname}></div>
                          <div className={styles.header__summary}></div>
                          <div className={styles.header__summary}></div>
                        </div>
                        <div className={styles.img__cell}>
                          <div className={styles.profile__img}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={roomStyles.room__section__flex}></div>

                  <div className={roomStyles.room__section__flex}>
                    <div className={roomStyles.section__divider}></div>
                    <div className={styles.user__profile__padding}>
                      <div className={styles.profile__item__margin}>
                        <div
                          className={styles.reservation__header__table}
                        ></div>
                      </div>
                      <div className={styles.profile__item__margin}>
                        <div
                          className={styles.reservation__header__table}
                        ></div>
                      </div>
                      <div className={styles.profile__item__margin}>
                        <div
                          className={styles.reservation__header__table}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Header);
