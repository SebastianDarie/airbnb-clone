import {
  HeartSvg,
  SearchListingResult,
  ReviewSvg,
} from "@second-gear/controller";
import Link from "next/link";
import styles from "../../sass/components/ListingCard.module.scss";
import { FloorPlanDetails } from "../FloorPlanDetails";
import { ImageCard } from "./ImageCard";

interface ListingCardProps {
  id: string;
  listing: SearchListingResult;
  loading: boolean;
  searchStyles: {
    readonly [key: string]: string;
  };
}

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  listing,
  loading,
  searchStyles,
}) => {
  let avg = 0;
  let reviewsLength = listing.reviews.length;
  if (reviewsLength > 0) {
    for (const review of listing.reviews) {
      avg += review.rating;
    }
  }

  const ListingContent = (
    <>
      <div className={styles.card__header__flex}>
        <div className={styles.text__margin}>
          <div className={styles.property__type}>
            <div className={styles.property__type__text}>
              Entire {listing.category} in {listing.city}
            </div>
          </div>
          <div className={styles.card__title__container}>
            <span className={styles.card__title}>{listing.title}</span>
          </div>
        </div>

        <button className={styles.heart__btn}>
          <HeartSvg />
        </button>
      </div>

      <div className={styles.card__divider__small}></div>

      <div className={styles.card__description} style={{ marginTop: 9 }}>
        <FloorPlanDetails
          bathrooms={listing.bathrooms}
          bedrooms={listing.bedrooms}
          beds={listing.beds}
          guests={listing.guests}
        />
      </div>

      <div className={styles.card__description} style={{ marginTop: 4 }}>
        {listing.amenities.slice(0, 4).map((amenity, i) => (
          <>
            <span key={i}>{amenity}</span>
            {i === 3 ? null : <span key={3}> · </span>}
          </>
        ))}
      </div>

      <div className={styles.card__footer}>
        <div className={styles.reviews__container}>
          <span className={searchStyles.reviews__flex}>
            <span className={searchStyles.review__star}>
              <ReviewSvg />
            </span>
            {reviewsLength > 0 ? (
              <>
                <span className={searchStyles.review__avg}>
                  {avg / reviewsLength}
                </span>
                <span className={searchStyles.review__count}>
                  &nbsp;( {reviewsLength} reviews )
                </span>
              </>
            ) : (
              <span className={searchStyles.review__avg}>New</span>
            )}
          </span>
        </div>

        <div className={styles.price__container}>
          <div className={searchStyles.price__align}>
            <div className={searchStyles.price__flex}>
              <span className={searchStyles.price__value}>
                ${listing.price}
              </span>
              <span className={searchStyles.price__night}>/ night</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div key={id} className={styles.size__div}>
      <div className={styles.border__padding}>
        <div className={styles.card__grid}>
          <div
            className={loading ? styles.card__area__loading : styles.card__area}
          >
            <div className={styles.card__divider__margin}>
              <div className={styles.card__container}>
                {loading ? null : (
                  <Link href={`/rooms/${listing.id}`}>
                    <a
                      className={styles.invisible__link}
                      rel="noopener noreferrer"
                    ></a>
                  </Link>
                )}

                <div className={styles.card__image__container}>
                  {loading ? (
                    <span className={styles.card__image__border__loading}>
                      <span className={styles.card__skeleton}></span>
                    </span>
                  ) : (
                    <ImageCard listing={listing} />
                  )}
                </div>

                <div className={styles.card__content__margin}>
                  {loading ? (
                    <>
                      <div style={{ marginBottom: 4 }}>
                        <span className={styles.property__type__skeleton}>
                          <span className={styles.card__skeleton}></span>
                        </span>
                      </div>

                      <span className={styles.title__skeleton}>
                        <span className={styles.card__skeleton}></span>
                      </span>

                      <div className={styles.card__divider__small}></div>

                      <div style={{ marginTop: 9 }}>
                        <span className={styles.floor__plan__skeleton}>
                          <span className={styles.card__skeleton}></span>
                        </span>
                      </div>
                      <div style={{ marginTop: 4 }}>
                        <span className={styles.amenities__skeleton}>
                          <span className={styles.card__skeleton}></span>
                        </span>
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <span className={styles.reviews__skeleton}>
                          <span className={styles.card__skeleton}></span>
                        </span>
                      </div>
                    </>
                  ) : (
                    ListingContent
                  )}
                </div>
              </div>

              <div className={styles.card__divider__margin}>
                <div className={styles.card__divider}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
