import Image from 'next/image';
import Link from 'next/link';
import { HeadersQuery } from '@airbnb-clone/controller';

interface ConversationListProps {
  currHeader: any;
  data: HeadersQuery;
  roomStyles: {
    readonly [key: string]: string;
  };
  styles: {
    readonly [key: string]: string;
  };
}

export const ConversationList: React.FC<ConversationListProps> = ({
  currHeader,
  data,
  roomStyles,
  styles,
}) => {
  return (
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
                {data.headers.map((h) => (
                  <div
                    key={h.id}
                    className={styles.message__item__margin}
                    style={{
                      backgroundColor:
                        currHeader[0].id === h.id ? 'whitesmoke' : 'white',
                    }}
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
                                {
                                  h.messages
                                    .slice()
                                    .sort(
                                      (a, b) =>
                                        parseInt(b.createdAt) -
                                        parseInt(a.createdAt)
                                    )[0].text
                                }
                              </div>
                            </div>
                            <div className={styles.message__day}>
                              <time
                                dateTime={new Date(
                                  +h.messages[h.messages.length - 1].createdAt
                                ).toLocaleDateString('en-US')}
                              >
                                {new Date(
                                  +h.messages[h.messages.length - 1].createdAt
                                ).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                })}
                              </time>
                            </div>
                          </div>
                          <div className={styles.message__subject__margin}>
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
  );
};
