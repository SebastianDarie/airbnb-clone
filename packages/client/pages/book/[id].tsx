import { useCreatePaymentIntentMutation } from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import styles from '../../sass/pages/Book.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import { useGetListingFromUrl } from '../../shared-hooks/useGetListingFromUrl';
import ReservationStore from '../../stores/useReservationStore';
import { StripeCardProps } from '../../types';
import { withApollo } from '../../utils/withApollo';

const AirbnbSmallSvg = dynamic<{ fill: string }>(() =>
  import('@second-gear/controller').then((mod) => mod.AirbnbSmallSvg)
);
const AirbnbSvg = dynamic<{}>(() =>
  import('@second-gear/controller').then((mod) => mod.AirbnbSvg)
);
const ArrowLeftSvg = dynamic<{
  height: string;
  width: string;
  strokeWidth: string;
}>(() => import('@second-gear/controller').then((mod) => mod.ArrowLeftSvg));
const Image = dynamic(() => import('next/image'));
const Link = dynamic(() => import('next/link'));
const ServerError = dynamic<{}>(() =>
  import('../../components/ServerError').then((mod) => mod.ServerError)
);
const StripeCard = dynamic<StripeCardProps>(() =>
  import('../../components/Stripe/StripeCard').then((mod) => mod.StripeCard)
);

interface BookProps {}

const Book: React.FC<BookProps> = ({}) => {
  const router = useRouter();
  const [
    createPaymentIntent,
    { data: clientSecret },
  ] = useCreatePaymentIntentMutation();
  const { data, variables } = useGetListingFromUrl(true);
  const [message, setMessage] = useState('');
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [
    startDate,
    endDate,
    adults,
    children,
    infants,
  ] = ReservationStore.useReservationStore(
    (state) => [
      state.startDate,
      state.endDate,
      state.adults,
      state.children,
      state.infants,
    ],
    shallow
  );

  if (!startDate || !endDate || !data) {
    return <ServerError />;
  }

  const nights = Math.ceil(
    Math.abs(endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000)
  );

  useEffect(() => {
    if (variables?.id)
      createPaymentIntent({ variables: { id: variables.id, nights } });
  }, []);

  const guests = adults + children + infants;
  const currency = '$';
  const prePrice = Math.floor(data?.listing?.price! * nights);
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
                            {guests} guests
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
                    <div className={roomStyles.section__divider}></div>
                    <div className={styles.price__details__padding}>
                      <label>
                        <div className={styles.required__flex}>
                          <div className={styles.price__details__header}>
                            <h2 className={roomStyles.section__heading}>
                              Required for your trip
                            </h2>
                          </div>
                        </div>

                        <div className={styles.required__divider}></div>
                        <div className={styles.message__host}>
                          Message the host
                        </div>
                        <div className={styles.host__info}>
                          Let the host know why you're traveling and when you'll
                          check in.
                        </div>
                        <div className={styles.required__divider}></div>

                        <div>
                          <div className={styles.host__profile__padding}>
                            <div className={roomStyles.title__profile__flex}>
                              <div className={styles.host__profile__img}>
                                <div className={styles.image__repeat}>
                                  <Image
                                    src={data.listing?.creator.photoUrl!}
                                    height='100%'
                                    width='100%'
                                    layout='responsive'
                                    objectFit='cover'
                                  />
                                </div>
                              </div>
                              <div
                                className={styles.host__profile__description}
                              >
                                <div className={styles.message__host}>
                                  {data?.listing?.creator.name}
                                </div>
                                <div className={styles.host__joined}>
                                  Joined in{' '}
                                  {new Date(
                                    +data.listing?.creator.createdAt!
                                  ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className={styles.message__area}>
                            <textarea
                              className={styles.textarea}
                              autoComplete='off'
                              onChange={(e) =>
                                setMessage(e.currentTarget.value)
                              }
                              onKeyDown={async (e) =>
                                (
                                  await import(
                                    '../../utils/autosizeTextarea'
                                  ).then((mod) => mod.autosizeTextarea)
                                )(e)
                              }
                              value={message}
                              rows={5}
                            ></textarea>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className={roomStyles.section__divider}></div>
                  </div>

                  <div className={roomStyles.room__section__flex}>
                    <div className={styles.required__divider}></div>
                    <StripeCard
                      clientSecret={clientSecret}
                      dates={[startDate, endDate]}
                      guests={guests}
                      listing={data.listing}
                      message={message}
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
                              {currency}
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
      </main>
    </>
  );
};

export default withApollo({ ssr: true })(Book);
