import styles from '../../sass/components/HomeView.module.scss';

interface HomeViewProps {}

export const HomeView: React.FC<HomeViewProps> = ({}) => {
  return (
    <div className={styles.HomeView__container}>
      <div>
        <div className={styles.HomeView__bg__container}>
          <div className={styles.HomeView__img__container}>
            <div className={styles.HomeView__img__config}>
              <picture>
                <source
                  srcSet='https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=2560 1x, https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=2560 2x'
                  media='(min-width: 1440px)'
                />
                <source
                  srcSet='https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=960 1x, https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=1920 2x'
                  media='(min-width: 950px)'
                />
                <source
                  srcSet='https://a0.muscache.com/im/pictures/090a6d00-576a-465e-b946-8d26ebedbe10.jpg?im_w=720 1x, https://a0.muscache.com/im/pictures/090a6d00-576a-465e-b946-8d26ebedbe10.jpg?im_w=1440 2x'
                  media='(min-width: 744px)'
                />
                <source srcSet='https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=320 1x, https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=720 2x' />
                <img
                  className={styles.HomeView__img}
                  src='https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_q=highq&im_w=720'
                />
              </picture>
              {/* <div
                style={{
                  display: 'none',
                  backgroundPosition: '50% 50%',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  height: '100%',
                  width: '100%',
                  backgroundImage:
                    'url(https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=720)',
                }}
              ></div> */}
            </div>
          </div>

          <div className={styles.HomeView__service__container}>
            <div className={styles.HomeView__flexer}>
              <div className={styles.HomeView__text__container}>
                <div className={styles.HomeView__logo__container}>
                  <picture>
                    <source
                      srcSet='https://airbnb-photos.s3.amazonaws.com/pictures/Storefronts/may2021_HP_clearLogo_en_l/original/9850ff2c-bd0b-4f37-9d33-84f10a566045.svg'
                      media='(min-width: 950px)'
                    />
                    <source
                      srcSet='https://airbnb-photos.s3.amazonaws.com/pictures/Storefronts/may2021_HP_clearLogo_en_s/original/85600273-0e2c-49b6-b44e-6d260b61826c.svg'
                      media='(min-width: 744px)'
                    />
                    <source srcSet='https://airbnb-photos.s3.amazonaws.com/pictures/Storefronts/may2021_HP_clearLogo_en_s/original/85600273-0e2c-49b6-b44e-6d260b61826c.svg' />
                    <img
                      aria-hidden='true'
                      alt='Airbnb 2021'
                      src='https://airbnb-photos.s3.amazonaws.com/pictures/Storefronts/may2021_HP_clearLogo_en_s/original/85600273-0e2c-49b6-b44e-6d260b61826c.svg'
                      style={{
                        position: 'static',
                        objectFit: 'contain',
                        verticalAlign: 'bottom',
                      }}
                    />
                  </picture>
                </div>
                <div>
                  <span>
                    <span className={styles.HomeView__service__text}>
                      Introducing 100+ upgrades across our entire service
                    </span>
                  </span>
                </div>
                <span className={styles.HomeView__learnnew}>
                  <a
                    href='https://www.airbnb.com/2021'
                    target='blank'
                    className={styles.HomeView__new__btn}
                  >
                    <div className={styles.HomeView__btn__bg}>
                      <span className={styles.HomeView__btn__text}>
                        Learn what's new
                      </span>
                    </div>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className=''>
            {/* add pd and mg */}
            <div style={{ width: '100%' }}>
              <section>
                <div></div>
                <div></div>
              </section>
              <div>
                <div className=''>
                  <a
                    className=''
                    href='/s/Chișinau/homes?place_id=ChIJoWm3KDZ8yUARPN1JVzDW0Tc&amp;refinement_paths%5B%5D=%2Fhomes&amp;search_type=section_navigation'
                  >
                    <span className=''>
                      <div className=''>
                        <picture>
                          <source
                            srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                            media='(max-width: 743px)'
                          />
                          <source
                            srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                            media='(min-width: 743.1px) and (max-width: 1127px)'
                          />
                          <source
                            srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                            media='(min-width: 1127.1px) and (max-width: 1439px)'
                          />
                          <source
                            srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                            media='(min-width: 1439.1px)'
                          />
                          <img
                            className=''
                            aria-hidden='true'
                            alt=''
                            decoding='async'
                            src='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=720'
                            data-original-uri='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?aki_policy=large'
                          />
                        </picture>
                        <div className=''></div>
                      </div>
                    </span>
                  </a>
                  <span className=''>
                    <span className=''>
                      <b>Chișinau</b>
                    </span>
                    <span className=''>15 minute drive</span>
                  </span>
                </div>

                <img
                  className=''
                  aria-hidden='true'
                  alt=''
                  decoding='async'
                  src='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=720'
                  data-original-uri='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?aki_policy=large'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
