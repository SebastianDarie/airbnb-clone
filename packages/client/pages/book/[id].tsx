import {
  AirbnbSmallSvg,
  AirbnbSvg,
  ArrowLeftSvg,
  useCreatePaymentIntentMutation,
} from '@airbnb-clone/controller';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { StripeCard } from '../../components/Stripe/StripeCard';
import styles from '../../sass/pages/Book.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import { useGetListingFromUrl } from '../../shared-hooks/useGetListingFromUrl';
import { useCalendarStore } from '../../stores/useCalendarStore';
import { convertToUTC } from '../../utils/converToUTC';
import { withApollo } from '../../utils/withApollo';

interface BookProps {}

const Book: React.FC<BookProps> = ({}) => {
  const router = useRouter();
  const [
    createPaymentIntent,
    { data: clientSecret },
  ] = useCreatePaymentIntentMutation();
  const { data, variables } = useGetListingFromUrl();
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [startDate, endDate] = useCalendarStore(
    (state) => [state.startDate, state.endDate],
    shallow
  );

  if (!startDate || !endDate) {
    return (
      <div>
        <h3>Something went wrong</h3>
        <div>
          Unfortunately, a server error prevented your request from being
          completed. Airbnb may be undergoing maintenance or your connection may
          have timed out. Please refresh the page or try again.
        </div>
      </div>
    );
  }

  const nights = Math.ceil(
    (convertToUTC(endDate).getTime() - convertToUTC(startDate).getTime()) /
      (24 * 60 * 60 * 1000)
  );

  useEffect(() => {
    if (variables?.id)
      createPaymentIntent({ variables: { id: variables.id, nights } });
  }, []);

  const currency = data?.listing?.price.slice(0, 1);
  const prePrice = Math.floor(
    parseFloat(data?.listing?.price.slice(1)!) * nights
  );
  const serviceFee = Math.floor((prePrice / 100) * 17);

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
                        <span
                          className={styles.back__link}
                          onClick={() => router.back()}
                        >
                          <span className={styles.relative__color}>
                            <ArrowLeftSvg
                              height='16px'
                              width='16px'
                              strokeWidth='3'
                            />
                          </span>
                        </span>
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
                  <div
                    className={roomStyles.room__section__flex}
                    style={{ display: succeeded ? 'none' : '' }}
                  >
                    <div className={roomStyles.amenities__heading__padding}>
                      <div className={styles.price__details__header}>
                        <h2 className={roomStyles.section__heading}>
                          Your trip
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div
                    className={roomStyles.room__section__flex}
                    style={{ display: succeeded ? 'none' : '' }}
                  >
                    <div className={roomStyles.amenities__heading__padding}>
                      <div className={styles.guests__count__flex}>
                        <div>
                          <div className={styles.font__bold}>
                            <h3 className={roomStyles.section__heading}>
                              Dates
                            </h3>
                          </div>
                          <div className={styles.guests__nr}>
                            {startDate.toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                            })}{' '}
                            -{' '}
                            {endDate.toLocaleDateString('en-US', {
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                        <button className={styles.currency__btn}>Edit</button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={roomStyles.room__section__flex}
                    style={{ display: succeeded ? 'none' : '' }}
                  >
                    <div className={roomStyles.amenities__heading__padding}>
                      <div className={styles.guests__count__flex}>
                        <div>
                          <div className={styles.font__bold}>
                            <h3 className={roomStyles.section__heading}>
                              Guests
                            </h3>
                          </div>
                          <div className={styles.guests__nr}>
                            {data?.listing?.guests} guests
                          </div>
                        </div>
                        <button className={styles.currency__btn}>Edit</button>
                      </div>
                    </div>
                  </div>

                  <div className={roomStyles.room__section__flex}>
                    <StripeCard
                      clientSecret={clientSecret}
                      succeeded={succeeded}
                      setSucceeded={setSucceeded}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.listing__side}>
                <div className={styles.listing__sticky__card}>
                  <div className={styles.card__border}>
                    <div className={roomStyles.room__section__flex}>
                      <div className={roomStyles.amenities__heading__padding}>
                        <div className={styles.listing__content__flex}>
                          <div className={styles.image__container}>
                            {data?.listing?.photos && (
                              <div className={styles.image__repeat}>
                                <Image
                                  src={data.listing.photos[0]}
                                  height='100%'
                                  width='100%'
                                  layout='responsive'
                                  objectFit='cover'
                                />
                              </div>
                            )}
                          </div>
                          <div className={styles.listing__description__flex}>
                            <div className={styles.listing__subheading}>
                              Entire {data?.listing?.category} in{' '}
                              {data?.listing?.city}
                            </div>
                            <div>
                              <div className={styles.listing__title}>
                                {data?.listing?.title}
                              </div>
                              <div className={styles.listing__floorplan}>
                                {data?.listing?.bathrooms} baths ·{' '}
                                {data?.listing?.beds} beds
                              </div>
                            </div>
                            <div className={styles.reviews__wrap}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={roomStyles.room__section__flex}>
                      <div className={roomStyles.section__divider}></div>
                      <div className={styles.price__details__padding}>
                        <div className={styles.price__details__header}>
                          <h2 className={roomStyles.section__heading}>
                            Price details
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className={roomStyles.room__section__flex}>
                      <div className={roomStyles.display__div}>
                        <div>
                          <div className={styles.table__display}>
                            <div className={styles.description__cell}>
                              {data?.listing?.price} x 5 nights
                            </div>
                            <div className={styles.price__cell}>
                              {currency}
                              {prePrice}
                            </div>
                          </div>
                        </div>
                        <div className={roomStyles.show__more__margin}>
                          <div className={styles.table__display}>
                            <div
                              className={styles.description__cell}
                              style={{ textDecoration: 'underline' }}
                            >
                              Service fee
                            </div>
                            <div className={styles.price__cell}>
                              {currency}
                              {serviceFee}
                            </div>
                          </div>
                        </div>
                        <div className={roomStyles.show__more__margin}>
                          <div className={styles.table__display}>
                            <div className={styles.description__cell}>
                              <div className={styles.price__total}>
                                Total{' '}
                                <button className={styles.currency__btn}>
                                  (USD)
                                </button>
                              </div>
                            </div>
                            <div className={styles.price__cell}>
                              <div className={styles.total__price}>
                                {currency}
                                {prePrice + serviceFee}
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
        {/* <div></div> */}
      </main>
    </>
  );
};

export default withApollo({ ssr: true })(Book);
