import styles from '../../sass/pages/Home.module.scss';

interface HomeViewProps {}

export const HomeView: React.FC<HomeViewProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.bg__container}>
          <div className={styles.img__container}>
            <div className={styles.img__config}>
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
                  className={styles.img}
                  src='https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_q=highq&im_w=720'
                />
              </picture>
            </div>
          </div>

          <div className={styles.service__container}>
            <div className={styles.flexer}>
              <div className={styles.text__container}>
                <div className={styles.logo__container}>
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
                    <span className={styles.service__text}>
                      Introducing 100+ upgrades across our entire service
                    </span>
                  </span>
                </div>
                <span className={styles.learnnew}>
                  <a
                    href='https://www.airbnb.com/2021'
                    target='blank'
                    className={styles.new__btn}
                  >
                    <div className={styles.btn__bg}>
                      <span className={styles.btn__text}>Learn what's new</span>
                    </div>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
