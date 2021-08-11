import { ReviewSvg } from '@second-gear/controller';
import Link from 'next/link';
import { ReviewsSectionProps } from '../../types';
import reviewStyles from './ReviewsSection.module.scss';

const calcAvg = (value: number, reviewsLength: number): string | number => {
  const avg = (value / reviewsLength).toFixed(1);
  return avg !== 'NaN' ? avg : 0;
};

const calcWidth = (value: number, reviewsLength: number): string => {
  return (value / (reviewsLength * 5)) * 100 + '%';
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  avg,
  reviews,
  reviewsRef,
  styles,
}) => {
  if (reviews == null) {
    return <></>;
  }

  let cleanliness = 0;
  let accuracy = 0;
  let communication = 0;
  let location = 0;
  let checkIn = 0;
  let value = 0;
  let reviewsLength = reviews.length;

  if (reviewsLength > 0) {
    for (const review of reviews) {
      cleanliness += review.cleanliness;
      accuracy += review.accuracy;
      communication += review.communication;
      location += review.location;
      checkIn += review.checkIn;
      value += review.value;
    }
  }

  return (
    <div className={styles.room__section__flex} ref={reviewsRef}>
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
                    {(avg / reviewsLength).toFixed(2) !== 'NaN'
                      ? (avg / reviewsLength).toFixed(2)
                      : 'New'}{' '}
                    · {reviews.length} reviews
                  </span>
                </h2>
              </div>
            </div>

            <div className={styles.display__div}>
              <div className={reviewStyles.reviews__details__margin}>
                <div className={styles.amenities__list__grid}>
                  <div className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__detail__margin}>
                      <div className={reviewStyles.review__detail__flex}>
                        <div className={reviewStyles.review__detail__text}>
                          Cleanliness
                        </div>
                        <div className={reviewStyles.detail__score__margin}>
                          <div className={reviewStyles.detail__bar__container}>
                            <span
                              className={reviewStyles.detail__bar}
                              style={{
                                width: calcWidth(cleanliness, reviewsLength),
                              }}
                            ></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {calcAvg(cleanliness, reviewsLength) || 0}
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
                            <span
                              className={reviewStyles.detail__bar}
                              style={{
                                width: calcWidth(accuracy, reviewsLength),
                              }}
                            ></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {calcAvg(accuracy, reviewsLength) || 0}
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
                            <span
                              className={reviewStyles.detail__bar}
                              style={{
                                width: calcWidth(communication, reviewsLength),
                              }}
                            ></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {calcAvg(communication, reviewsLength) || 0}
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
                            <span
                              className={reviewStyles.detail__bar}
                              style={{
                                width: calcWidth(location, reviewsLength),
                              }}
                            ></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {calcAvg(location, reviewsLength) || 0}
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
                            <span
                              className={reviewStyles.detail__bar}
                              style={{
                                width: calcWidth(checkIn, reviewsLength),
                              }}
                            ></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {calcAvg(checkIn, reviewsLength) || 0}
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
                            <span
                              className={reviewStyles.detail__bar}
                              style={{
                                width: calcWidth(value, reviewsLength),
                              }}
                            ></span>
                          </div>
                          <span className={reviewStyles.detail__rating}>
                            {calcAvg(value, reviewsLength) || 0}
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
                  <div key={r.id} className={styles.amenity__item__container}>
                    <div className={reviewStyles.review__bottom__margin}>
                      <div className={reviewStyles.review__header__flex}>
                        <div className={reviewStyles.profile__container}>
                          <Link href={`/users/${r.creator.id}`}>
                            <a className={styles.profile__btn}>
                              <div className={styles.profile}>
                                <img
                                  className={styles.profile__img}
                                  src={`${r.creator.photoUrl}`}
                                  alt='user image'
                                />
                              </div>
                            </a>
                          </Link>
                        </div>

                        <div className={reviewStyles.header__margin}>
                          {r.creator.name}
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
