import { ActiveElement } from '@airbnb-clone/controller';
import classNames from 'classnames';
import { useState, useRef } from 'react';
import styles from '../../sass/components/Searchbar.module.scss';
import useClickAway from '../../shared-hooks/useClickAway';
import { GuestsMenu } from '../Searchbar/GuestsMenu';

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

  const handleClickOutside = () => {
    setActiveElement({
      active: false,
      el: '',
    });
  };

  useClickAway(ref, handleClickOutside);

  //const { activeElement, ref, toggle } = useClickAway();
  // console.log(activeElement);

  const barScroll = scrolled ? styles.Searchbar__scroll : styles.Searchbar;
  const barActive = activeElement.active ? styles.Searchbar__active : '';
  // const cx = classNames.bind(styles);
  // const barClass = cx({
  //   Searchbar: !scrolled,
  //   Searchbar__scroll: scrolled,
  //   Searchbar__active: active,
  // });

  const menuOffsets = menuRef.current?.getBoundingClientRect();
  const searchOffsets = searchRef.current?.getBoundingClientRect();
  // let left = 0;
  // if (menuRef.current) {
  //   left = menuRef.current.getBoundingClientRect().right;
  //   //  menuRef.current?.ownerDocument.documentElement.clientLeft;
  // }
  // console.log(menuOffsets?.right, searchOffsets?.right);

  return (
    <div className={`${barScroll} ${barActive}`} ref={ref}>
      <div className={styles.Searchbar__container}>
        <div className={styles.Searchbar__part1}>
          <div
            className={styles.Searchbar__part1__container}
            onClick={() => setActiveElement({ active: true, el: 'searchbar' })}
          >
            <label className={styles.Searchbar__location}>
              <div className={styles.Searchbar__location__position}>
                <div className={styles.Searchbar__location__label}>
                  Location
                </div>
                {/* Switch to react hook form */}
                <input
                  className={styles.Searchbar__location__input}
                  aria-expanded='false'
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck='false'
                  placeholder='Where are you going?'
                />
              </div>
            </label>
          </div>
        </div>

        <div className={styles.vline}></div>

        <div className={styles.Searchbar__part2__container}>
          <div
            className={styles.Searchbar__part2__checkin}
            onClick={() => setActiveElement({ active: true, el: 'checkin' })}
          >
            <div className={styles.Searchbar__btn} role='button'>
              <div className={styles.Searchbar__text__container}>
                <div className={styles.Searchbar__text__bold}>Check in</div>
                <div className={styles.Searchbar__text__gray}>Add dates</div>
              </div>
            </div>
          </div>

          <div className={styles.vline}></div>

          <div
            className={styles.Searchbar__part2__checkin}
            onClick={() => setActiveElement({ active: true, el: 'checkout' })}
          >
            <div className={styles.Searchbar__btn} role='button'>
              <div className={styles.Searchbar__text__container}>
                <div className={styles.Searchbar__text__bold}>Check out</div>
                <div className={styles.Searchbar__text__gray}>Add dates</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.vline}></div>

        <div className={styles.Searchbar__part3__container} ref={searchRef}>
          <div
            className={
              activeElement.el === 'guests' && activeElement.active
                ? styles.Searchbar__btn__clicked
                : styles.Searchbar__btn
            }
            onClick={() => setActiveElement({ active: true, el: 'guests' })}
            role='button'
          >
            <div className={styles.Searchbar__text__container}>
              <div className={styles.Searchbar__text__bold}>Guests</div>
              <div className={styles.Searchbar__text__gray}>Add guests</div>
            </div>
          </div>

          <GuestsMenu activeElement={activeElement} menuRef={menuRef} />

          <div className={styles.Searchbar__icon__btn__container}>
            <button
              className={
                activeElement.el === 'guests' && activeElement.active
                  ? styles.Searchbar__icon__btn__active
                  : styles.Searchbar__icon__btn
              }
            >
              <div className={styles.Searchbar__inner__icon__container}>
                <svg
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  role='presentation'
                  focusable='false'
                  fill='none'
                  height='16'
                  width='16'
                  stroke='currentColor'
                  strokeWidth='4'
                  overflow='visible'
                >
                  <g fill='none'>
                    <path d='m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9'></path>
                  </g>
                </svg>

                <div
                  className={
                    activeElement.el === 'guests' && activeElement.active
                      ? styles.Searchbar__hidden__text__active
                      : styles.Searchbar__hidden__text
                  }
                >
                  Search
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
