import { FetchResult } from '@apollo/client';
import {
  AirbnbMessageSvg,
  ArchiveSvg,
  CreateMessageMutation,
  HeaderResult,
  HeadersDocument,
  HeadersQuery,
  MessageFormProps,
  SendMessageSvg,
  useMeQuery,
  useNewMessageSubscription,
} from '@second-gear/controller';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { autosizeTextarea } from '../../utils/autosizeTextarea';
import { DotLoader } from '../DotLoader';

interface ConversationPanelProps {
  data: HeadersQuery | undefined;
  details: boolean;
  loading: boolean;
  currHeader: HeaderResult | undefined;

  roomStyles: {
    readonly [key: string]: string;
  };
  styles: {
    readonly [key: string]: string;
  };

  setDetails: Dispatch<SetStateAction<boolean>>;
  submit: (
    values: MessageFormProps,
    currHeader: any
  ) => Promise<
    FetchResult<CreateMessageMutation, Record<string, any>, Record<string, any>>
  >;
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  data,
  details,
  loading,
  currHeader,
  roomStyles,
  styles,
  setDetails,
  submit,
}) => {
  const { data: meData } = useMeQuery();
  const [message, setMessage] = useState<string>('');

  useNewMessageSubscription({
    variables: { headerId: currHeader ? currHeader.id : '' },
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      const newMessage = data?.newMessage;
      const currHeaders = client.cache.readQuery<HeadersQuery>({
        query: HeadersDocument,
      });
      const newHeaders = currHeaders?.headers.map((h) => {
        if (h.id === newMessage?.headerId) {
          Object.assign({}, [...(h.messages || []), newMessage!], h.messages);
        }
      });

      client.cache.writeQuery({
        query: HeadersDocument,
        data: {
          headers: {
            ...newHeaders,
          },
        },
      });
    },
  });

  return (
    <section
      className={
        details ? styles.conversation__panel : styles.conversation__panel__wide
      }
    >
      <div className={styles.conversation__list__panel__transition}>
        <div className={styles.conversation__list__position}>
          {!data || loading ? (
            <DotLoader />
          ) : (
            <div className={styles.message__thread__toolbar}>
              <div className={styles.name__margin}>
                <div className={styles.messages__header}>
                  <h2 className={roomStyles.section__heading}>
                    {currHeader?.creator.name}
                  </h2>
                </div>
              </div>
              <div className={styles.archive__margin}>
                <ArchiveSvg />
              </div>
              <div className={styles.toggle__details__margin}>
                <button
                  className={
                    details
                      ? styles.hide__details__btn
                      : styles.get__details__btn
                  }
                  onClick={() => setDetails(!details)}
                >
                  {details ? 'Hide details' : 'Get details'}
                </button>
              </div>
            </div>
          )}

          {!data || loading ? (
            <DotLoader />
          ) : (
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
                              +currHeader?.createdAt!
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
                                  To protect your payment, always communicate
                                  and pay through the Airbnb website or app.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {currHeader?.messages
                          .slice()
                          .sort(
                            (a, b) =>
                              parseInt(a.createdAt) - parseInt(b.createdAt)
                          )
                          .map((m, i, arr) => {
                            let conversationStart: boolean = false;
                            let minDiff: boolean = false;

                            if (i === 0) {
                              conversationStart = false;
                              minDiff = false;
                            } else {
                              conversationStart =
                                new Date(+arr[i - 1].createdAt).getDay() !==
                                new Date(+m.createdAt).getDay();

                              minDiff =
                                Math.floor(
                                  Math.abs(
                                    new Date(+arr[i - 1].createdAt).getTime() -
                                      new Date(+m.createdAt).getTime()
                                  ) / 60000
                                ) <= 5;
                            }

                            return (
                              <React.Fragment key={m.id}>
                                {conversationStart ? (
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
                                        className={
                                          styles.standard__message__flex
                                        }
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
                                              className={
                                                styles.message__creator
                                              }
                                            >
                                              {m.creator.name}
                                            </span>
                                            <span
                                              className={styles.message__day}
                                            >
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
                                    headerId: currHeader ? currHeader.id : '',
                                    isFromSender:
                                      currHeader?.creator.id === meData?.me?.id
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
          )}
        </div>
      </div>
    </section>
  );
};
