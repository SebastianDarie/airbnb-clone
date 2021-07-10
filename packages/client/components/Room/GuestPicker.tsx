import menuStyles from '../../sass/components/GuestsMenu.module.scss';
import { MinusSvg, PlusSvg } from '@airbnb-clone/controller';
import ReservationStore from '../../stores/useReservationStore';
import shallow from 'zustand/shallow';
import { MutableRefObject, useRef } from 'react';
import useClickAway from '../../shared-hooks/useClickAway';

interface GuestPickerProps {
  active: boolean;
  guests: number;
  menu: MutableRefObject<HTMLDivElement | null>;
  styles: {
    readonly [key: string]: string;
  };
}

export const GuestPicker: React.FC<GuestPickerProps> = ({
  active,
  guests,
  menu,
  styles,
}) => {
  const [adults, children, infants] = ReservationStore.useReservationStore(
    (state) => [state.adults, state.children, state.infants],
    shallow
  );
  // const menu = useRef<HTMLDivElement | null>(null);
  // useClickAway(menu, () => console.log('ouside click'));

  return (
    <div
      ref={menu}
      className={styles.guest__picker__container}
      style={{ display: active ? 'block' : 'none' }}
    >
      <div className={styles.guest__picker__item__mr}>
        <div className={styles.guest__picker__item}>
          <div className={styles.guest__type__flex}>
            <div className={styles.guest__type__font}>Adults</div>
          </div>
          <div id={styles.guest__count__flex}>
            <div className={menuStyles.guests__input}>
              <button
                className={menuStyles.guests__minus}
                disabled={adults === 0}
                type='button'
                onClick={() => ReservationStore.updateAdults(adults - 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={menuStyles.guests__count}>
                <span>{adults}</span>
              </div>
              <button
                className={menuStyles.guests__plus}
                type='button'
                onClick={() => ReservationStore.updateAdults(adults + 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.guest__picker__item__mr}>
        <div className={styles.guest__picker__item}>
          <div className={styles.guest__type__flex}>
            <div className={styles.guest__type__font}>Children</div>
          </div>
          <div id={styles.guest__count__flex}>
            <div className={menuStyles.guests__input}>
              <button
                className={menuStyles.guests__minus}
                disabled={children === 0}
                type='button'
                onClick={() => ReservationStore.updateChildren(children - 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={menuStyles.guests__count}>
                <span>{children}</span>
              </div>
              <button
                className={menuStyles.guests__plus}
                type='button'
                onClick={() => ReservationStore.updateChildren(children + 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.guest__picker__item__mr}>
        <div className={styles.guest__picker__item}>
          <div className={styles.guest__type__flex}>
            <div className={styles.guest__type__font}>Infants</div>
          </div>
          <div id={styles.guest__count__flex}>
            <div className={menuStyles.guests__input}>
              <button
                className={menuStyles.guests__minus}
                disabled={infants === 0}
                type='button'
                onClick={() => ReservationStore.updateInfants(infants - 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={menuStyles.guests__count}>
                <span>{infants}</span>
              </div>
              <button
                className={menuStyles.guests__plus}
                type='button'
                onClick={() => ReservationStore.updateInfants(infants + 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.guest__maximum__count}>
        {guests} guests maximum. Infants don’t count toward the number of
        guests.
      </div>

      <div className={styles.guest__picker__close__flex}>
        <button className={styles.guest__picker__close}>Close</button>
      </div>
    </div>
  );
};
