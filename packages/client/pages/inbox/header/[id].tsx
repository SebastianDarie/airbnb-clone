import { ArchiveSvg, ArrowLeftSvg } from '@airbnb-clone/controller';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Layout from '../../../components/Layout';
import styles from '../../../sass/pages/Header.module.scss';
import roomStyles from '../../../sass/pages/Room.module.scss';
import { withApollo } from '../../../utils/withApollo';
import Link from 'next/link';
import { useGetHeadersFromUrl } from '../../../shared-hooks/useGetHeadersFromUrl';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data, variables } = useGetHeadersFromUrl();
  console.log(data?.headers.length);

  if (!data) {
    return <div>failed to load or loading...</div>;
  }

  return (
    <Layout search={false}>
      <div className={styles.inbox__position}>
        <div className={styles.inbox__sections__flex}>
          <section className={styles.conversation__list__panel}>
            <div className={styles.conversation__list__panel__transition}>
              <div className={styles.conversation__list__position}>
                <div className={styles.messages__header__padding}>
                  <div className={styles.messages__header}>
                    <h1 className={roomStyles.section__heading}>Messages</h1>
                  </div>
                </div>

                <div className={styles.messages__list__flex}>
                  <div className={styles.messages__overflow}>
                    <div>
                      {data?.headers.map((h) => (
                        <div
                          key={h.id}
                          className={styles.message__item__margin}
                        >
                          <div className={styles.message__item__padding}>
                            <Link href={`/inbox/header/${h.id}`}>
                              <a className={styles.message__item__link}></a>
                            </Link>
                            <div className={styles.message__content__flex}>
                              <div className={styles.message__profile__margin}>
                                <div className={styles.message__profile__image}>
                                  <Image
                                    src={h.creator.photoUrl}
                                    height='100%'
                                    width='100%'
                                    layout='responsive'
                                    objectFit='cover'
                                  />
                                </div>
                              </div>
                              <div className={styles.message__content__grow}>
                                <div className={styles.message__sender__name}>
                                  <div className={styles.message__sender}>
                                    {h.creator.name}
                                  </div>
                                </div>
                                <div className={styles.message__text__flex}>
                                  <div className={styles.message__text}>
                                    <div className={styles.message__sender}>
                                      {h.messages[h.messages.length - 1].text}
                                    </div>
                                  </div>
                                  <div className={styles.message__day}>
                                    <time dateTime=''>
                                      {new Date(
                                        +h.messages[h.messages.length - 1]
                                          .createdAt
                                      ).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                      })}
                                    </time>
                                  </div>
                                </div>
                                <div
                                  className={styles.message__subject__margin}
                                >
                                  <div className={styles.message__sender}>
                                    <span>{h.subject} · Jul 13 - 20</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className={styles.messages__end}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.conversation__panel}>
            <div className={styles.conversation__list__panel__transition}>
              <div className={styles.conversation__list__position}>
                <div className={styles.message__thread__toolbar}>
                  <div className={styles.name__margin}>
                    <div className={styles.name__font}>
                      <h2 className={roomStyles.section__heading}>
                        {
                          data.headers.filter(
                            (h) => h.id === variables?.headerId
                          )[0].creator.name
                        }
                      </h2>
                    </div>
                  </div>
                  <div className={styles.archive__margin}>
                    <ArchiveSvg />
                  </div>
                  <div className={styles.toggle__details__margin}>
                    <button className={styles.toggle__details__btn}>
                      Hide details
                    </button>
                  </div>
                </div>

                <div className={styles.messages__flex}>
                  <div className={styles.messages__column}>
                    <div className={styles.message__list}>
                      <div className={styles.message__list__position}>
                        <div className={styles.message__list__bottom}>
                          <div className={styles.message__input__width}>
                            <div className={styles.conversation__start}></div>
                            <div className={styles.message__container}>
                              <h3 className={styles.conversation__date}>
                                Jul 6, 2021
                              </h3>
                              <div className={styles.message__width}>
                                <div className={styles.airbnb__message__margin}>
                                  <div
                                    className={styles.airbnb__message__padding}
                                  >
                                    <div
                                      className={styles.airbnb__svg__margin}
                                    ></div>
                                    <div
                                      className={styles.airbnb__message__text}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.message__input__grow}>
                      <div className={styles.message__input__width}>
                        <div className={styles.message__input__margin}>
                          <div className={styles.input__width}>
                            <div className={styles.input__container}>
                              <textarea
                                className={styles.message__input}
                                placeholder='Type a message'
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.conversation__list__panel}></section>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Header);
