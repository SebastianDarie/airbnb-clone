import Layout from '../../components/Layout';
import { withApollo } from '../../utils/withApollo';
import styles from '../../sass/pages/Room.module.scss';
import { useGetListingFromUrl } from '../../shared-hooks/useGetListingFromUrl';

interface RoomProps {}

const Room: React.FC<RoomProps> = ({}) => {
  const { data, loading, error } = useGetListingFromUrl();

  return (
    <Layout search={false}>
      <div className={styles.display__div}>
        <div className={styles.room__section__flex}>
          <div className={styles.room__section__padding}>
            <div className={styles.room__section__margin}>
              <div className={styles.room__section__top}>
                <div className={styles.room__title__container}>
                  <h1 className={styles.room__title}>{data?.listing?.title}</h1>
                </div>

                <div className={styles.room__header__footer}>
                  <div className={styles.room__header__reviews}>
                    <div className={styles.room__header__details}></div>
                    <span className={styles.room__header__dot}>·</span>
                    <div className={styles.room__header__details}></div>
                    <span className={styles.room__header__dot}>·</span>
                    <span className={styles.room__header__details}>
                      <span className={styles.room__header__location}>
                        {data?.listing?.city}
                      </span>
                    </span>
                  </div>
                  <div className={styles.display__div}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.room__section__flex}>
          <div className={styles.room__section__padding}>
            <div className={styles.room__section__margin}>
              <div className={styles.room__section__top}>
                <div className={styles.display__div}>
                  <div className={styles.room__images__border}>
                    <div className={styles.room__images__container}>
                      <div className={styles.room__images__padding}>
                        <div className={styles.room__images__position}>
                          <div className={styles.room__cover__position}>
                            <div className={styles.room__images__container}>
                              <div className={styles.room__image__relative}>
                                <div className={styles.room__cover__container}>
                                  <img src={data?.listing?.photos[0]} />
                                </div>

                                <div
                                  className={styles.room__cover__hover}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className={styles.room__images__flex}>
                            <div className={styles.room__images__container}>
                              <div className={styles.room__image__top}>
                                <div className={styles.room__image__relative}>
                                  <div
                                    className={styles.room__cover__container}
                                  >
                                    <img src={data?.listing?.photos[1]} />
                                  </div>
                                </div>
                              </div>
                              <div className={styles.room__image__bottom}>
                                <div className={styles.room__image__relative}>
                                  <div
                                    className={styles.room__cover__container}
                                  >
                                    <img src={data?.listing?.photos[2]} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={styles.room__images__flex}>
                            <div className={styles.room__images__container}>
                              <div className={styles.room__image__top}>
                                <div className={styles.room__image__relative}>
                                  <div
                                    className={styles.room__cover__container}
                                  >
                                    <img src={data?.listing?.photos[3]} />
                                  </div>
                                </div>
                              </div>
                              <div className={styles.room__image__bottom}>
                                <div className={styles.room__image__relative}>
                                  <div
                                    className={styles.room__cover__container}
                                  >
                                    <img src={data?.listing?.photos[4]} />
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
              </div>
            </div>
          </div>
        </div>

        <div className={styles.room__description__section}>
          <div className={styles.description__side}></div>
          <div className={styles.booking__side}>
            <div className={styles.sticky__menu}>
              <div className={styles.room__section__flex}>
                <div className={styles.menu__topmargin}>
                  <div className={styles.menu__border}>
                    <div className={styles.menu__text__style}>
                      <div className={styles.menu__column}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Room);
