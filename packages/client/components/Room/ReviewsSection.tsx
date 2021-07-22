import { Reviews, ReviewSvg } from '@airbnb-clone/controller';
import Link from 'next/link';
import reviewStyles from './ReviewsSection.module.scss';

interface ReviewsSectionProps {
  reviews: Reviews;
  styles: {
    readonly [key: string]: string;
  };
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  styles,
}) => {
  if (reviews == null) {
    return <></>;
  }

  let avg = 0;
  let cleanliness = 0;
  let accuracy = 0;
  let communication = 0;
  let location = 0;
  let checkIn = 0;
  let value = 0;
  let reviewsLength = reviews.length;
  for (const review of reviews) {
    avg += review.rating;
    cleanliness += review.cleanliness;
    accuracy += review.accuracy;
    communication += review.communication;
    location += review.location;
    checkIn += review.checkIn;
    value += review.value;
  }

  return (
    <div className={styles.room__section__flex}>
      <div className={styles.room__section__padding}>
        <div className={styles.room__section__margin}>
          <div className={styles.section__divider}></div>
          <div className={styles.section__padding}>
            <div className={reviewStyles.reviews__bottom}>
              <div className={styles.amenities__heading__container}>
                <h2 className={styles.section__heading}>
                  <span className={reviewStyles.svg__margin}>
                    <ReviewSvg />
                  </span>
                  <span>
                    {avg / reviewsLength} · {reviews.length} reviews
                  </span>
                </h2>
              </div>
            </div>

            <div className={styles.display__div}>
              <div className={reviewStyles.reviews__details__margin}>
                <div className={reviewStyles.amenities__list__grid}>
                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__detail__margin}>
                      <div className={reviewStyles.review__detail__flex}>
                        <div className={reviewStyles.review__detail__text}>
                          Cleanliness
                        </div>
                        <div className={reviewStyles.detail__score__margin}>
                          <div className={reviewStyles.detail__bar__container}>
                            <span className={reviewStyles.detail__bar}></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {cleanliness / reviewsLength}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__detail__margin}>
                      <div className={reviewStyles.review__detail__flex}>
                        <div className={reviewStyles.review__detail__text}>
                          Accuracy
                        </div>
                        <div className={reviewStyles.detail__score__margin}>
                          <div className={reviewStyles.detail__bar__container}>
                            <span className={reviewStyles.detail__bar}></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {accuracy / reviewsLength}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__detail__margin}>
                      <div className={reviewStyles.review__detail__flex}>
                        <div className={reviewStyles.review__detail__text}>
                          Communication
                        </div>
                        <div className={reviewStyles.detail__score__margin}>
                          <div className={reviewStyles.detail__bar__container}>
                            <span className={reviewStyles.detail__bar}></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {communication / reviewsLength}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__detail__margin}>
                      <div className={reviewStyles.review__detail__flex}>
                        <div className={reviewStyles.review__detail__text}>
                          Location
                        </div>
                        <div className={reviewStyles.detail__score__margin}>
                          <div className={reviewStyles.detail__bar__container}>
                            <span className={reviewStyles.detail__bar}></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {location / reviewsLength}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__detail__margin}>
                      <div className={reviewStyles.review__detail__flex}>
                        <div className={reviewStyles.review__detail__text}>
                          Check-in
                        </div>
                        <div className={reviewStyles.detail__score__margin}>
                          <div className={reviewStyles.detail__bar__container}>
                            <span className={reviewStyles.detail__bar}></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {checkIn / reviewsLength}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__detail__margin}>
                      <div className={reviewStyles.review__detail__flex}>
                        <div className={reviewStyles.review__detail__text}>
                          Value
                        </div>
                        <div className={reviewStyles.detail__score__margin}>
                          <div className={reviewStyles.detail__bar__container}>
                            <span className={reviewStyles.detail__bar}></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {value / reviewsLength}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.display__div}>
              <div className={reviewStyles.reviews__details__container}>
                {reviews.map((r) => (
                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__bottom__margin}>
                      <div className={reviewStyles.review__header__flex}>
                        <Link href=''>
                          <a className={styles.profile__btn}>
                            <div className={styles.profile}>
                              <img className={styles.profile__img} src={``} />
                            </div>
                          </a>
                        </Link>

                        <div className={reviewStyles.header__margin}>
                          user name here
                          <div className={reviewStyles.review__date}>
                            {new Date(+r.createdAt).toLocaleDateString(
                              'en-US',
                              { month: 'long', year: 'numeric' }
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={reviewStyles.review__text}>
                        {r.review}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
