import menuStyles from '../../sass/components/GuestsMenu.module.scss';
import { MinusSvg, PlusSvg } from '@airbnb-clone/controller';
import { MutableRefObject } from 'react';

interface GuestPickerProps {
  active: boolean;
  guests: number;
  picker: MutableRefObject<HTMLDivElement | null>;
  styles: {
    readonly [key: string]: string;
  };
  handler: () => void;
}

export const GuestPicker: React.FC<GuestPickerProps> = ({
  active,
  guests,
  picker,
  styles,
  handler,
}) => {
  return (
    <div
      className={styles.guest__picker__container}
      ref={picker}
      style={{ display: active ? 'block' : 'none' }}
      //onMouseDownCapture={handler}
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
                // disabled={adults === 0}
                // type='button'
                // onClick={() => updateAdults(adults - 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={menuStyles.guests__count}>
                <span>0</span>
              </div>
              <button
                className={menuStyles.guests__plus}
                type='button'
                // onClick={() => updateAdults(adults + 1)}
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
                // disabled={adults === 0}
                // type='button'
                // onClick={() => updateAdults(adults - 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={menuStyles.guests__count}>
                <span>0</span>
              </div>
              <button
                className={menuStyles.guests__plus}
                type='button'
                // onClick={() => updateAdults(adults + 1)}
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
                // disabled={adults === 0}
                // type='button'
                // onClick={() => updateAdults(adults - 1)}
              >
                <span className={menuStyles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={menuStyles.guests__count}>
                <span>0</span>
              </div>
              <button
                className={menuStyles.guests__plus}
                type='button'
                // onClick={() => updateAdults(adults + 1)}
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
