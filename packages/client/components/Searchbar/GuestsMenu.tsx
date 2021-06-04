import { ActiveElement, MinusSvg, PlusSvg } from '@airbnb-clone/controller';
import { MutableRefObject } from 'react';
import styles from '../../sass/components/GuestsMenu.module.scss';

interface GuestsMenuProps {
  activeElement: ActiveElement;
  menuRef: MutableRefObject<HTMLDivElement | null>;
}

export const GuestsMenu: React.FC<GuestsMenuProps> = ({
  activeElement,
  menuRef,
}) => {
  return (
    <div
      className={styles.Searchbar__guests__menu}
      ref={menuRef}
      style={{
        display: `${activeElement.el === 'guests' ? 'block' : 'none'}`,
      }}
    >
      <div className={styles.Searchbar__guests__container}>
        <section>
          <div className={styles.Searchbar__guests__age}>
            <div className={styles.Searchbar__guests__group}>
              <div className={styles.Searchbar__guests__title}>Adults</div>
              <div className={styles.Searchbar__guests__variant}>
                Ages 13 or above
              </div>
            </div>
            <div className={styles.Searchbar__guests__input}>
              <button
                className={styles.Searchbar__guests__minus}
                disabled
                type='button'
              >
                <span className={styles.Searchbar__guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={styles.Searchbar__guests__count}>
                <span>0</span>
                <span className={styles.Searchbar__guests__value__hidden}>
                  0 or more Adults
                </span>
              </div>
              <button className={styles.Searchbar__guests__plus} type='button'>
                <span className={styles.Searchbar__guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
          <div className={styles.Searchbar__guests__age}>
            <div className={styles.Searchbar__guests__group}>
              <div className={styles.Searchbar__guests__title}>Children</div>
              <div className={styles.Searchbar__guests__variant}>Ages 2-12</div>
            </div>
            <div className={styles.Searchbar__guests__input}>
              <button
                className={styles.Searchbar__guests__minus}
                disabled
                type='button'
              >
                <span className={styles.Searchbar__guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={styles.Searchbar__guests__count}>
                <span>0</span>
                <span className={styles.Searchbar__guests__value__hidden}>
                  0 or more Adults
                </span>
              </div>
              <button className={styles.Searchbar__guests__plus} type='button'>
                <span className={styles.Searchbar__guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
          <div className={styles.Searchbar__guests__age}>
            <div className={styles.Searchbar__guests__group}>
              <div className={styles.Searchbar__guests__title}>Infants</div>
              <div className={styles.Searchbar__guests__variant}>Under 2</div>
            </div>
            <div className={styles.Searchbar__guests__input}>
              <button
                className={styles.Searchbar__guests__minus}
                disabled
                type='button'
              >
                <span className={styles.Searchbar__guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={styles.Searchbar__guests__count}>
                <span>0</span>
                <span className={styles.Searchbar__guests__value__hidden}>
                  0 or more Adults
                </span>
              </div>
              <button className={styles.Searchbar__guests__plus} type='button'>
                <span className={styles.Searchbar__guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
