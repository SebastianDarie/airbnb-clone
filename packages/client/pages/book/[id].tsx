import {
  AirbnbSmallSvg,
  AirbnbSvg,
  ArrowLeftSvg,
} from '@airbnb-clone/controller';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../sass/pages/Book.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import { withApollo } from '../../utils/withApollo';

interface BookProps {}

const Book: React.FC<BookProps> = ({}) => {
  return (
    <>
      <div className={roomStyles.display__div}>
        <div className={styles.header}>
          <Link href='/'>
            <a className={styles.logo__link}>
              <span className={styles.icon}>
                <AirbnbSvg />
              </span>
              <span className={styles.icon__small}>
                <AirbnbSmallSvg fill='currentColor' />
              </span>
            </a>
          </Link>
        </div>
      </div>

      <main className={styles.main__height}>
        <div className={styles.page__font}>
          <div className={roomStyles.display__div}>
            <div className={roomStyles.room__section__flex}>
              <div className={roomStyles.room__section__padding}>
                <div className={roomStyles.room__section__margin}>
                  <div className={styles.pay__bottom}>
                    <div className={styles.header__padding}>
                      <div className={styles.link__padding}>
                        <Link href='/'>
                          <a className={styles.back__link}>
                            <ArrowLeftSvg />
                          </a>
                        </Link>
                      </div>
                      <div className={styles.header__container}>
                        <h1 className={roomStyles.section__heading}>
                          Confirm and pay
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={roomStyles.room__description__section}>
              <div className={styles.trip__side}>
                <div>
                  <div className={roomStyles.room__section__flex}></div>
                  <div className={roomStyles.room__section__flex}></div>
                  <div className={roomStyles.room__section__flex}></div>
                  <div className={roomStyles.room__section__flex}></div>
                  <div className={roomStyles.room__section__flex}></div>
                  <div className={roomStyles.room__section__flex}></div>
                  <div className={roomStyles.room__section__flex}></div>
                  <div className={roomStyles.room__section__flex}></div>
                </div>
              </div>
              <div className={styles.listing__side}>
                <div className={styles.listing__sticky__card}>
                  <div className={styles.card__border}>
                    <div className={roomStyles.room__section__flex}>
                      <div className={roomStyles.amenities__heading__padding}>
                        <div className={styles.listing__content__flex}>
                          <div className={styles.image__container}>
                            {/* <Image src='' layout='responsive' objectFit='cover' /> */}
                          </div>
                          <div className={styles.listing__description__flex}>
                            <div className={styles.listing__subheading}>
                              Entire apartment in Africa
                            </div>
                            <div>
                              <div className={styles.listing__title}></div>
                              <div className={styles.listing__floorplan}></div>
                            </div>
                            <div className={styles.reviews__wrap}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={roomStyles.room__section__flex}>
                      <div className={roomStyles.section__divider}></div>
                      <div></div>
                    </div>
                    <div className={roomStyles.room__section__flex}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div></div> */}
      </main>
    </>
  );
};

export default withApollo({ ssr: true })(Book);
