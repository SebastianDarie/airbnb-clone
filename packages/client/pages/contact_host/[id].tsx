import { ArrowLeftSvg } from '@airbnb-clone/controller';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  BaseSyntheticEvent,
  KeyboardEventHandler,
  SyntheticEvent,
} from 'react';
import Layout from '../../components/Layout';
import styles from '../../sass/pages/ContactHost.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import { withApollo } from '../../utils/withApollo';

interface ContactHostProps {}

const ContactHost: React.FC<ContactHostProps> = ({}) => {
  const router = useRouter();

  return (
    <Layout filter search>
      <form>
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
                          Contact Sebastian
                        </h1>
                      </div>
                    </div>
                    <div className={roomStyles.profile__margin}>
                      <div className={roomStyles.profile__size}>
                        <div className={roomStyles.profile}>
                          <Image
                            src='https://a0.muscache.com/im/pictures/user/061f66a1-0515-48be-a24a-c6eda9772651.jpg?im_w=240'
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
                      onKeyDown={(e: any) => {
                        e.currentTarget.style.height = 'inherit';
                        e.currentTarget.style.height = `${e.target.scrollHeight}px`;
                      }}
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

export default withApollo({ ssr: false })(ContactHost);
