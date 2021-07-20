import { TripsSvg } from '@airbnb-clone/controller';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';
import styles from '../sass/pages/Trips.module.scss';
import roomStyles from '../sass/pages/Room.module.scss';
import { useState } from 'react';
import Link from 'next/link';

interface TripsProps {}

const Trips: React.FC<TripsProps> = ({}) => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <Layout filter search={false}>
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
            <div className={styles.tab__header}>
              {tab === 'past'
                ? `You don’t have any past trips yet—but when you do, you’ll find
              them here.`
                : `When you’re ready to start planning your next trip, we’re here to help.`}
            </div>
            <div className={roomStyles.room__section__flex}>
              <div className={styles.tab__background}>
                <TripsSvg />
              </div>

              <div className={styles.entire__index}>
                <ul className={styles.bookings__row}>
                  <div className={styles.booking__item}>
                    <div className={styles.interior__booking__item}>
                      <img
                        className={`${styles.index__photo} ${styles.booking}`}
                      />
                      <li className={styles.booking__city}>city here</li>
                      <li className={`${styles.item__type} ${styles.booking}`}>
                        arrival - departure
                      </li>
                      <li className={`${styles.item__type} ${styles.booking}`}>
                        guests
                      </li>
                      <Link href={`/rooms/`}>
                        <a>
                          <li
                            className={`${styles.item__title} ${styles.booking}`}
                          >
                            title here
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Trips);
