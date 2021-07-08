import {
  AirbnbMessageSvg,
  ArchiveSvg,
  Exact,
  HeadersQuery,
  MessageFormProps,
  SendMessageSvg,
  useMeQuery,
} from '@airbnb-clone/controller';
import Image from 'next/image';
import React, { useState } from 'react';
import { autosizeTextarea } from '../../utils/autosizeTextarea';

interface ConversationPanelProps {
  data: HeadersQuery;
  roomStyles: {
    readonly [key: string]: string;
  };
  styles: {
    readonly [key: string]: string;
  };
  variables:
    | Exact<{
        headerId: string;
      }>
    | undefined;
  submit: (values: MessageFormProps, currHeader: any) => Promise<boolean>;
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  data,
  roomStyles,
  styles,
  variables,
  submit,
}) => {
  const { data: meData } = useMeQuery();
  const [message, setMessage] = useState<string>('');

  const currHeader = data.headers.filter((h) => h.id === variables?.headerId);

  return (
    <section className={styles.conversation__panel}>
      <div className={styles.conversation__list__panel__transition}>
        <div className={styles.conversation__list__position}>
          <div className={styles.message__thread__toolbar}>
            <div className={styles.name__margin}>
              <div className={styles.name__font}>
                <h2 className={roomStyles.section__heading}>
                  {currHeader[0].creator.name}
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
                          {new Date(
                            +currHeader[0].createdAt
                          ).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </h3>
                        <div className={styles.message__width}>
                          <div className={styles.airbnb__message__margin}>
                            <div className={styles.airbnb__message__padding}>
                              <div className={styles.airbnb__svg__margin}>
                                <AirbnbMessageSvg />
                              </div>
                              <div className={styles.airbnb__message__text}>
                                To protect your payment, always communicate and
                                pay through the Airbnb website or app.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {currHeader[0].messages
                        .slice()
                        .sort(
                          (a, b) =>
                            parseInt(a.createdAt) - parseInt(b.createdAt)
                        )
                        .map((m, i, arr) => {
                          const minDiff =
                            new Date(+m.createdAt).getMinutes() -
                              new Date(
                                +arr[i === 0 ? 0 : i - 1].createdAt
                              ).getMinutes() <=
                            5;
                          return (
                            <React.Fragment key={m.id}>
                              {new Date(
                                +arr[i === 0 ? 0 : i - 1].createdAt
                              ).getDay() !== new Date(+m.createdAt).getDay() ? (
                                <h3 className={styles.conversation__date}>
                                  {new Date(+m.createdAt).toLocaleDateString(
                                    'en-US',
                                    {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    }
                                  )}
                                </h3>
                              ) : null}
                              <div className={styles.message__container}>
                                <div className={styles.message__width}>
                                  <div
                                    className={
                                      minDiff
                                        ? styles.recent__message__margin
                                        : styles.standard__message__margin
                                    }
                                  >
                                    <div
                                      className={styles.standard__message__flex}
                                    >
                                      <div
                                        className={
                                          styles.standard__message__profile
                                        }
                                        style={{
                                          display: minDiff ? 'none' : '',
                                        }}
                                      >
                                        <Image
                                          src={m.creator.photoUrl}
                                          height='100%'
                                          width='100%'
                                          layout='responsive'
                                          objectFit='cover'
                                        />
                                      </div>
                                      <div
                                        className={
                                          styles.standard__message__content
                                        }
                                        style={{
                                          display: minDiff ? 'none' : '',
                                        }}
                                      >
                                        <div
                                          className={
                                            styles.standard__message__padding
                                          }
                                        >
                                          <span
                                            className={styles.message__creator}
                                          >
                                            {m.creator.name}
                                          </span>
                                          <span className={styles.message__day}>
                                            {new Date(
                                              +m.createdAt
                                            ).toLocaleTimeString('en-US', {
                                              hour: 'numeric',
                                              minute: 'numeric',
                                            })}
                                          </span>
                                        </div>
                                        <div
                                          className={
                                            styles.standard__message__text
                                          }
                                        >
                                          {m.text}
                                        </div>
                                      </div>
                                      <div
                                        className={
                                          styles.standard__message__text
                                        }
                                        style={{
                                          display: !minDiff ? 'none' : '',
                                        }}
                                      >
                                        {m.text}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
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
                          onChange={(e) => setMessage(e.currentTarget.value)}
                          onKeyDown={autosizeTextarea}
                          placeholder='Type a message'
                          value={message}
                        ></textarea>
                        <div
                          className={styles.send__btn__margin}
                          style={{ display: message ? '' : 'none' }}
                        >
                          <button
                            className={styles.send__btn}
                            onClick={() =>
                              submit(
                                {
                                  text: message,
                                  headerId: currHeader[0].id,
                                  isFromSender:
                                    currHeader[0].creator.id === meData?.me?.id
                                      ? 1
                                      : 0,
                                },
                                currHeader
                              )
                            }
                          >
                            <span className={styles.svg__relative}>
                              <SendMessageSvg />
                            </span>
                          </button>
                        </div>
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
  );
};
