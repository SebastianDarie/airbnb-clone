import {
  Reservation,
  TripsSvg,
  useListingLazyQuery,
  useListingQuery,
  useReservationsQuery,
} from '@airbnb-clone/controller';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';
import styles from '../sass/pages/Trips.module.scss';
import roomStyles from '../sass/pages/Room.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TripsProps {}

const ReservationItem = ({
  r,
}: {
  r: Pick<Reservation, 'id' | 'arrival' | 'departure' | 'guests' | 'listingId'>;
}) => {
  const { data, loading, error } = useListingQuery({
    variables: { id: r.listingId },
  });

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
            <button className={styles.modify__booking__btn__pink}>
              Edit this reservation
            </button>
            <button className={styles.modify__booking__btn__green}>
              Cancel this reservation
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Trips: React.FC<TripsProps> = ({}) => {
  const { data, loading, error } = useReservationsQuery();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  if (error) {
    console.log(error);
  }

  if (loading) {
    console.log(loading);
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
              {data.reservations.length > 0 ? null : (
                <div className={styles.tab__header}>
                  {tab === 'past'
                    ? `You don’t have any past trips yet—but when you do, you’ll find
              them here.`
                    : `When you’re ready to start planning your next trip, we’re here to help.`}
                </div>
              )}
              <div className={roomStyles.room__section__flex}>
                {data.reservations.length > 0 ? null : (
                  <div className={styles.tab__background}>
                    <TripsSvg />
                  </div>
                )}

                {data.reservations.length > 0 ? (
                  <div className={styles.entire__index}>
                    <ul className={styles.bookings__row}>
                      {data.reservations.map((r) => (
                        <ReservationItem key={r.id} r={r} />
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
