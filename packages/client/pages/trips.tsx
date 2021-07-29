import {
  CancelReservationMutationFn,
  RefundReservationMutationFn,
  TripReservation,
  TripsSvg,
  useCancelReservationMutation,
  useListingQuery,
  useRefundReservationMutation,
  useReservationsQuery,
} from '@second-gear/controller';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { DotLoader } from '../components/DotLoader';
import Layout from '../components/Layout';
import roomStyles from '../sass/pages/Room.module.scss';
import styles from '../sass/pages/Trips.module.scss';
import { withApollo } from '../utils/withApollo';

interface TripsProps {}

const ReservationItem = ({
  r,
  router,
  cancelReservation,
  refundReservation,
}: {
  r: TripReservation;
  router: NextRouter;
  cancelReservation: CancelReservationMutationFn;
  refundReservation: RefundReservationMutationFn;
}) => {
  const { data, loading } = useListingQuery({
    variables: { id: r.listingId, slim: true, noreviews: true },
  });

  if (loading) {
    return (
      <div className={styles.booking__item}>
        <div className={styles.interior__booking__item}>
          <DotLoader />
        </div>
      </div>
    );
  }

  return (
    <>
      {' '}
      {data && (
        <div key={r.id} className={styles.booking__item}>
          <div className={styles.interior__booking__item}>
            <img
              className={`${styles.index__photo} ${styles.booking}`}
              src={data.listing?.photos[0]}
            />
            <li className={styles.booking__city}>{data.listing?.city}</li>
            <li className={`${styles.item__type} ${styles.booking}`}>
              {new Date(r.arrival).toLocaleDateString('en-US', {
                day: '2-digit',
                year: 'numeric',
                weekday: 'short',
                month: 'short',
              })}{' '}
              -{' '}
              {new Date(r.departure).toLocaleDateString('en-US', {
                day: '2-digit',
                year: 'numeric',
                weekday: 'short',
                month: 'short',
              })}
            </li>
            <li className={`${styles.item__type} ${styles.booking}`}>
              {r.guests} guests
            </li>
            <Link href={`/rooms/`}>
              <a>
                <li className={`${styles.item__title} ${styles.booking}`}>
                  {data.listing?.title}
                </li>
              </a>
            </Link>
            <button
              className={styles.modify__booking__btn__pink}
              onClick={() => router.push(`/review-trip/${r.listingId}`)}
            >
              {r.completed ? 'Review this trip' : 'Edit this reservation'}
            </button>
            {!r.completed ? (
              <button
                className={styles.modify__booking__btn__green}
                onClick={() => {
                  cancelReservation({
                    variables: { id: r.id },
                    update: (cache) => {
                      cache.evict({ id: 'Reservation:' + r.id });
                      cache.gc();
                    },
                  });
                  refundReservation({
                    variables: { paymentIntent: r.paymentIntent },
                  });
                }}
              >
                Cancel this reservation
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

const Trips: React.FC<TripsProps> = ({}) => {
  const router = useRouter();
  const { data, loading, error } = useReservationsQuery();
  const [cancelReservation] = useCancelReservationMutation();
  const [refundReservation] = useRefundReservationMutation();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  if (error) {
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

  if (loading) {
    return (
      <Layout filter search={false}>
        <DotLoader />
      </Layout>
    );
  }

  let length = 0;
  if (data?.reservations) {
    length = data.reservations.length;
  }

  return (
    <Layout filter search={false}>
      {data && (
        <div className={styles.trips__container}>
          <div className={styles.trips__heading}>
            <h1 className={roomStyles.section__heading}>Trips</h1>
          </div>

          <div className={styles.trips__tabs__margin}>
            <button
              className={
                tab === 'upcoming' ? styles.tab__active : styles.tab__default
              }
              onClick={() => setTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={
                tab === 'past' ? styles.tab__active : styles.tab__default
              }
              onClick={() => setTab('past')}
            >
              Past
            </button>
          </div>

          <div className={styles.trips__list__margin}>
            <div>
              {length > 0 ? null : (
                <div className={styles.tab__header}>
                  {tab === 'past'
                    ? `You don’t have any past trips yet—but when you do, you’ll find
              them here.`
                    : `When you’re ready to start planning your next trip, we’re here to help.`}
                </div>
              )}
              <div className={roomStyles.room__section__flex}>
                {length > 0 ? null : (
                  <div className={styles.tab__background}>
                    <TripsSvg />
                  </div>
                )}

                {length > 0 ? (
                  <div className={styles.entire__index}>
                    <ul className={styles.bookings__row}>
                      {data.reservations
                        .filter((r) =>
                          tab === 'upcoming' && !r.cancelled
                            ? !r.completed
                            : r.completed
                        )
                        .map((r) => (
                          <ReservationItem
                            key={r.id}
                            r={r}
                            router={router}
                            cancelReservation={cancelReservation}
                            refundReservation={refundReservation}
                          />
                        ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Trips);
