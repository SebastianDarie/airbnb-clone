import DatePicker from 'react-datepicker';
import shallow from 'zustand/shallow';
import ReservationStore from '../../stores/useReservationStore';
import { CalendarProps } from '../../types';
import { DotLoader } from '../DotLoader';

export const Calendar: React.FC<CalendarProps> = ({
  city,
  loading,
  nights,
  styles,
}) => {
  const [startDate, endDate] = ReservationStore.useReservationStore(
    (state) => [state.startDate, state.endDate],
    shallow
  );

  return (
    <div className={styles.room__section__flex}>
      <div className={styles.section__divider}></div>
      <div className={styles.section__padding}>
        <div>
          <div>
            <div className={styles.amenities__heading__container}>
              <h2 className={styles.section__heading}>
                {startDate && endDate
                  ? `${nights} nights in ${city}`
                  : 'Select check-in date'}
              </h2>
            </div>

            <div className={styles.calendar__range}>
              <div className={styles.calendar__availability}>
                {startDate && endDate
                  ? startDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }) +
                    '-' +
                    endDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Add your travel dates for exact pricing'}
              </div>
            </div>
          </div>
          <div className={styles.calendar__overflow__container}>
            <div className={styles.calendar__margin__container}>
              {loading ? (
                <div className={styles.loading__margin}>
                  {' '}
                  <DotLoader />{' '}
                </div>
              ) : (
                <div className={styles.calendar__minheight}>
                  <div className={styles.calendar__width}>
                    <DatePicker
                      inline
                      selected={startDate}
                      onChange={(date) =>
                        ReservationStore.updateStart(date as Date)
                      }
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <DatePicker
                      inline
                      selected={endDate}
                      onChange={(date) =>
                        ReservationStore.updateEnd(date as Date)
                      }
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
