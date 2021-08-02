import {
  useCreateHeaderMutation,
  useCreateMessageMutation,
} from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import styles from '../../sass/pages/ContactHost.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import { useGetListingFromUrl } from '../../shared-hooks/useGetListingFromUrl';
import { withApollo } from '../../utils/withApollo';

const ArrowLeftSvg = dynamic<{
  height: string;
  width: string;
  strokeWidth: string;
}>(() => import('@second-gear/controller').then((mod) => mod.ArrowLeftSvg));
const Image = dynamic(() => import('next/image'));
const Layout = dynamic(() => import('../../components/Layout'));
const ServerError = dynamic<{}>(() =>
  import('../../components/ServerError').then((mod) => mod.ServerError)
);

interface ContactHostProps {}

const ContactHost: React.FC<ContactHostProps> = ({}) => {
  const router = useRouter();
  const { data } = useGetListingFromUrl(true);
  const [createHeader] = useCreateHeaderMutation();
  const [createMessage] = useCreateMessageMutation();
  const [message, setMessage] = useState('');

  if (!data) {
    return <ServerError />;
  }

  return (
    <Layout filter room search>
      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const { data: headerData } = await createHeader({
            variables: {
              input: {
                listingId: router.query.id as string,
                subject: 'Inquiry',
                toId: data.listing!.creator.id,
              },
            },
          });

          if (headerData) {
            const { errors } = await createMessage({
              variables: {
                input: {
                  headerId: headerData.createHeader.id,
                  isFromSender: 1,
                  text: message,
                },
              },
            });

            if (!errors) {
              router.push(`/inbox/header/${headerData.createHeader.id}`);
            }
          }
        }}
      >
        <div className={roomStyles.display__div}>
          <div>
            <div className={roomStyles.room__section__flex}>
              <div className={roomStyles.room__section__padding}>
                <div className={roomStyles.room__section__margin}>
                  <div className={styles.back__btn__padding}>
                    <a
                      className={styles.back__btn}
                      onClick={() => router.back()}
                    >
                      <div className={styles.back__btn__center}>
                        <ArrowLeftSvg
                          height='24px'
                          width='24px'
                          strokeWidth='2.66'
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={roomStyles.room__description__section}>
            <div className={roomStyles.description__side}>
              <div className={roomStyles.room__section__flex}>
                <div className={styles.contact__host__padding}>
                  <div className={roomStyles.room__navbar__align}>
                    <div>
                      <div className={roomStyles.amenities__heading__container}>
                        <h1 className={roomStyles.section__heading}>
                          Contact {data.listing!.creator.name}
                        </h1>
                      </div>
                    </div>
                    <div className={roomStyles.profile__margin}>
                      <div className={roomStyles.profile__size}>
                        <div className={roomStyles.profile}>
                          <Image
                            src={data.listing!.creator.photoUrl}
                            height='100%'
                            width='100%'
                            layout='responsive'
                            objectFit='cover'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.section__divider}></div>
                <div className={styles.message__padding}>
                  <div className={styles.questions__header}>
                    <h2 className={roomStyles.section__heading}>
                      Still have questions? Message the host
                    </h2>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.amenities__heading__padding}>
                  <div className={styles.textarea__shadow}>
                    <textarea
                      className={styles.textarea}
                      autoComplete='off'
                      onChange={(e) => setMessage(e.currentTarget.value)}
                      onKeyDown={async (e) =>
                        (
                          await import('../../utils/autosizeTextarea').then(
                            (mod) => mod.autosizeTextarea
                          )
                        )(e)
                      }
                      value={message}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <button type='submit' className={roomStyles.contact__btn}>
                  Send message
                </button>
              </div>
            </div>
            <div className={roomStyles.booking__side}></div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default withApollo({ ssr: true })(ContactHost);
