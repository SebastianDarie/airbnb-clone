import { ReviewSvg } from '@airbnb-clone/controller';
import reviewStyles from './ReviewsSection.module.scss';

interface ReviewsSectionProps {
  styles: {
    readonly [key: string]: string;
  };
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ styles }) => {
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
                  <span>5.0 · 9 reviews</span>
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
                            5.0
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
                            5.0
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
                            5.0
                          </span>
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
  );
};
