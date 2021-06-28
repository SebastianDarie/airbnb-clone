import Link from 'next/link';
import styles from '../sass/components/ListingCard.module.scss';

interface ListingCardProps {}

export const ListingCard: React.FC<ListingCardProps> = ({}) => {
  return (
    <div className={styles.size__div}>
      <div className={styles.border__padding}>
        <div className={styles.card__grid}>
          <div className={styles.card__area}>
            <div className={styles.card__divider__margin}>
              <div className={styles.card__container}>
                <Link href='/rooms/'>
                  <a
                    className={styles.invisible__link}
                    rel='noopener noreferrer'
                  ></a>
                </Link>

                <div className={styles.card__image__container}></div>

                <div className={styles.card__content__margin}>
                  <div className={styles.card__header__flex}>
                    <div className={styles.text__margin}>
                      <div className={styles.property__type}>
                        <div className={styles.property__type__text}>
                          Entire apartment in New York
                        </div>
                      </div>
                      <div className={styles.card__title__container}>
                        <span className={styles.card__title}>Gugu gaga</span>
                      </div>
                    </div>

                    <button className={styles.heart__btn}>
                      <svg
                        viewBox='0 0 32 32'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                        display='block'
                        fill='transparent'
                        height='24px'
                        width='24px'
                        stroke='rgb(34, 34, 34)'
                        strokeWidth='2'
                        overflow='visible'
                      >
                        <path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
                      </svg>
                    </button>
                  </div>

                  <div className={styles.card__divider__small}></div>

                  <div
                    className={styles.card__description}
                    style={{ marginTop: 9 }}
                  >
                    <span>4 guests</span>
                    <span> · </span>
                    <span>1 bedroom</span>
                    <span> · </span>
                    <span>1 bed</span>
                    <span> · </span>
                    <span>1 bath</span>
                  </div>

                  <div
                    className={styles.card__description}
                    style={{ marginTop: 4 }}
                  >
                    <span>Wifi</span>
                    <span> · </span>
                    <span>Kitchen</span>
                    <span> · </span>
                    <span>Air conditioning</span>
                    <span> · </span>
                    <span>Washer</span>
                  </div>

                  <div className={styles.card__footer}>
                    <div className={styles.reviews__container}>
                      <span className={styles.reviews__flex}>
                        <span className={styles.review__star}></span>
                        <span className={styles.review__avg}>5.0</span>
                        <span></span>
                      </span>
                    </div>
                    <div className={styles.price__container}></div>
                  </div>
                </div>
              </div>
              <div className={styles.card__divider}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
