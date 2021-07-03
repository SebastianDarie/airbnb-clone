import {
  ActiveElement,
  BigSearchSvg,
  ClearSvg,
} from '@airbnb-clone/controller';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import shallow from 'zustand/shallow';
import styles from '../../sass/components/Searchbar.module.scss';
import useClickAway from '../../shared-hooks/useClickAway';
import { useSearchStore } from '../../stores/useSearchStore';
import { GuestsMenu } from './GuestsMenu';

interface SearchbarProps {
  scrolled: boolean;
}

export const Searchbar: React.FC<SearchbarProps> = ({ scrolled }) => {
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    active: false,
    el: '',
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const geoRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    setActiveElement({
      active: false,
      el: '',
    });
  };

  useClickAway(ref, handleClickOutside);

  const barScroll = scrolled ? styles.scroll : styles.Searchbar;
  const barActive = activeElement.active ? styles.active : '';

  const [adults, children, infants, setLocation] = useSearchStore(
    (state) => [state.adults, state.children, state.infants, state.setLocation],
    shallow
  );

  useEffect(() => {
    if (geoRef.current?.textContent !== '') {
      const location = geoRef.current?.textContent
        ?.replace(/Lat:.*/, '')
        .replace(/Suggestion:/, '');
      const coords = geoRef.current?.textContent?.split(/[^\d]+/);
      setLocation(
        location!,
        parseFloat(coords?.[1]! + '.' + coords?.[2]),
        parseFloat(coords?.[3]! + '.' + coords?.[4])
      );
    }
  }, [geoRef.current?.textContent]);

  return (
    <div className={`${barScroll} ${barActive}`} ref={ref}>
      <div className={styles.container}>
        <div className={styles.part1}>
          <div
            className={styles.part1__container}
            onClick={() => setActiveElement({ active: true, el: 'searchbar' })}
          >
            <label className={styles.location}>
              <div className={styles.location__position} id='location_box'>
                <div className={styles.location__label}>Location</div>
                {/* Switch to react hook form */}
                <input
                  className={styles.location__input}
                  id='location'
                  autoComplete='off'
                  placeholder='Where are you going?'
                />
              </div>
            </label>
          </div>

          <div id='output' style={{ visibility: 'hidden' }} ref={geoRef}></div>
        </div>

        <div
          className={styles.vline}
          style={{
            visibility:
              activeElement.el === 'searchbar' || activeElement.el === 'checkin'
                ? 'hidden'
                : 'visible',
          }}
        ></div>

        <div className={styles.part2__container}>
          <div
            className={styles.part2__checkin}
            onClick={() => setActiveElement({ active: true, el: 'checkin' })}
          >
            <button className={styles.btn} type='button'>
              <div className={styles.text__container}>
                <div className={styles.text__bold}>Check in</div>
                <div className={styles.text__gray}>Add dates</div>
              </div>
            </button>
          </div>

          <div
            className={styles.vline}
            style={{
              visibility:
                activeElement.el === 'checkin' ||
                activeElement.el === 'checkout'
                  ? 'hidden'
                  : 'visible',
            }}
          ></div>

          <div
            className={styles.part2__checkin}
            onClick={() => setActiveElement({ active: true, el: 'checkout' })}
          >
            <button className={styles.btn} type='button'>
              <div className={styles.text__container}>
                <div className={styles.text__bold}>Check out</div>
                <div className={styles.text__gray}>Add dates</div>
              </div>
            </button>
          </div>
        </div>

        <div
          className={styles.vline}
          style={{
            visibility:
              activeElement.el === 'checkout' || activeElement.el === 'guests'
                ? 'hidden'
                : 'visible',
          }}
        ></div>

        <div className={styles.part3__container} ref={searchRef}>
          <button
            className={
              activeElement.el === 'guests' && activeElement.active
                ? styles.btn__clicked
                : styles.btn
            }
            type='button'
            onClick={() => setActiveElement({ active: true, el: 'guests' })}
          >
            <div className={styles.text__container}>
              <div className={styles.text__bold}>Guests</div>
              {adults || children || infants > 0 ? (
                <div className={styles.text__guests}>
                  {adults + children} guests
                  {infants ? ', ' + infants + ' infants' : null}
                </div>
              ) : (
                <div className={styles.text__gray}>Add guests</div>
              )}
            </div>
          </button>

          {adults || children || infants > 0 ? (
            <div className={styles.clear__container}>
              <div className={styles.clearbtn__container}>
                <button
                  className={styles.clear__btn}
                  onClick={useSearchStore.getState().resetGuests}
                >
                  <span style={{ position: 'relative' }}>
                    <ClearSvg />
                  </span>
                </button>
              </div>
            </div>
          ) : null}

          <GuestsMenu activeElement={activeElement} menuRef={menuRef} />

          <div className={styles.icon__btn__container}>
            <Link href='/search'>
              <button
                className={
                  activeElement.el === 'guests' && activeElement.active
                    ? styles.icon__btn__active
                    : styles.icon__btn
                }
              >
                <div className={styles.inner__icon__container}>
                  <BigSearchSvg />

                  <div
                    className={
                      activeElement.el === 'guests' && activeElement.active
                        ? styles.hidden__text__active
                        : styles.hidden__text
                    }
                  >
                    Search
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
