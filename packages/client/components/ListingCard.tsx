import Image from 'next/image';
import Link from 'next/link';
import {
  HeartSvg,
  Listing,
  NextSvg,
  PreviousSvg,
  ReviewSvg,
} from '@airbnb-clone/controller';
import styles from '../sass/components/ListingCard.module.scss';
import { useState } from 'react';

interface ListingCardProps {
  listing: {
    __typename?: 'Listing' | undefined;
  } & Pick<
    Listing,
    | 'title'
    | 'id'
    | 'category'
    | 'photos'
    | 'bathrooms'
    | 'beds'
    | 'guests'
    | 'price'
    | 'createdAt'
    | 'city'
    | 'bedrooms'
    | 'amenities'
  >;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [showControls, setShowControls] = useState(false);

  return (
    <div className={styles.size__div}>
      <div className={styles.border__padding}>
        <div className={styles.card__grid}>
          <div className={styles.card__area}>
            <div className={styles.card__divider__margin}>
              <div
                className={styles.card__container}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <Link href={`/rooms/${listing.id}`}>
                  <a
                    className={styles.invisible__link}
                    rel='noopener noreferrer'
                  ></a>
                </Link>

                <div className={styles.card__image__container}>
                  <div className={styles.card__image__border}>
                    <div className={styles.card__image__padding}>
                      <div className={styles.card__image__position}>
                        <div>
                          <Link href={`/rooms/${listing.id}`}>
                            <a className={styles.card__image__link}></a>
                          </Link>

                          <div className={styles.card__image__div}>
                            <div>
                              <picture>
                                {listing.photos.length > 0 ? (
                                  <Image
                                    src={listing.photos[0]}
                                    layout='fill'
                                    objectFit='cover'
                                  />
                                ) : (
                                  <Image
                                    src='https://d9r6g0xftldzw.cloudfront.net/listings/2021-06-25-yw433-pexels-pixabay-271624-jpg'
                                    layout='fill'
                                    objectFit='cover'
                                  />
                                )}
                              </picture>
                            </div>
                          </div>
                        </div>

                        <div className={styles.image__dots__container}>
                          <div className={styles.image__dots}>
                            <div className={styles.image__dots__overflow}>
                              <div className={styles.image__dots__transform}>
                                {listing.photos.length > 0 ? (
                                  listing.photos.map((_photo, i) => (
                                    <span
                                      key={i}
                                      className={styles.image__dots__dot}
                                      id={
                                        i === 0
                                          ? styles.selected__dot
                                          : undefined
                                      }
                                    ></span>
                                  ))
                                ) : (
                                  <>
                                    <span
                                      className={styles.image__dots__dot}
                                      id={styles.selected__dot}
                                    ></span>
                                    <span
                                      className={styles.image__dots__dot}
                                    ></span>
                                    <span
                                      className={styles.image__dots__dot}
                                    ></span>
                                    <span
                                      className={styles.image__dots__dot}
                                    ></span>
                                    <span
                                      className={styles.image__dots__dot}
                                    ></span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        showControls
                          ? styles.image__controls__hover
                          : styles.image__controls__container
                      }
                    >
                      <div className={styles.image__controls__position}>
                        <div
                          className={
                            showControls
                              ? styles.previous__btn__hover
                              : styles.previous__btn__container
                          }
                        >
                          <button
                            className={styles.navigation__btn}
                            onClick={() => console.log('previous')}
                          >
                            <PreviousSvg />
                          </button>
                        </div>
                        <div
                          className={
                            showControls
                              ? styles.next__btn__hover
                              : styles.next__btn__container
                          }
                        >
                          <button
                            className={styles.navigation__btn}
                            onClick={() => console.log('next')}
                          >
                            <NextSvg />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.card__content__margin}>
                  <div className={styles.card__header__flex}>
                    <div className={styles.text__margin}>
                      <div className={styles.property__type}>
                        <div className={styles.property__type__text}>
                          Entire {listing.category} in {listing.city}
                        </div>
                      </div>
                      <div className={styles.card__title__container}>
                        <span className={styles.card__title}>
                          {listing.title}
                        </span>
                      </div>
                    </div>

                    <button className={styles.heart__btn}>
                      <HeartSvg />
                    </button>
                  </div>

                  <div className={styles.card__divider__small}></div>

                  <div
                    className={styles.card__description}
                    style={{ marginTop: 9 }}
                  >
                    <span>{listing.guests} guests</span>
                    <span> · </span>
                    <span>{listing.bedrooms} bedrooms</span>
                    <span> · </span>
                    <span>{listing.beds} beds</span>
                    <span> · </span>
                    <span>{listing.bathrooms} baths</span>
                  </div>

                  <div
                    className={styles.card__description}
                    style={{ marginTop: 4 }}
                  >
                    <span>{listing.amenities[0]}</span>
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
                        <span className={styles.review__star}>
                          <ReviewSvg />
                        </span>
                        <span className={styles.review__avg}>5.0</span>
                        <span className={styles.review__count}>
                          &nbsp;( 9 reviews )
                        </span>
                      </span>
                    </div>

                    <div className={styles.price__container}>
                      <div className={styles.price__align}>
                        <div className={styles.price__flex}>
                          <span className={styles.price__value}>
                            {listing.price}
                          </span>
                          <span className={styles.price__night}>/ night</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
