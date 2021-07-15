import { ActiveElement, MinusSvg, PlusSvg } from '@airbnb-clone/controller';
import { MutableRefObject } from 'react';
import shallow from 'zustand/shallow';
import styles from '../../sass/components/GuestsMenu.module.scss';
import SearchStore from '../../stores/useSearchStore';

interface GuestsMenuProps {
  activeElement: ActiveElement;
  menuRef: MutableRefObject<HTMLDivElement | null>;
}

export const GuestsMenu: React.FC<GuestsMenuProps> = ({
  activeElement,
  menuRef,
}) => {
  const [adults, children, infants] = SearchStore.useSearchStore(
    (state) => [state.adults, state.children, state.infants],
    shallow
  );
  const updateAdults = SearchStore.updateAdults;
  const updateChildren = SearchStore.updateChildren;
  const updateInfants = SearchStore.updateInfants;

  return (
    <div
      className={styles.guests__menu}
      ref={menuRef}
      style={{
        display: `${activeElement.el === 'guests' ? 'block' : 'none'}`,
      }}
    >
      <div className={styles.guests__container}>
        <section>
          <div className={styles.guests__age}>
            <div className={styles.guests__group}>
              <div className={styles.guests__title}>Adults</div>
              <div className={styles.guests__variant}>Ages 13 or above</div>
            </div>
            <div className={styles.guests__input}>
              <button
                className={styles.guests__minus}
                disabled={adults === 0}
                type='button'
                onClick={() => updateAdults(adults - 1)}
              >
                <span className={styles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={styles.guests__count}>
                <span>{adults}</span>
              </div>
              <button
                className={styles.guests__plus}
                type='button'
                onClick={() => updateAdults(adults + 1)}
              >
                <span className={styles.guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
          <div className={styles.guests__age}>
            <div className={styles.guests__group}>
              <div className={styles.guests__title}>Children</div>
              <div className={styles.guests__variant}>Ages 2-12</div>
            </div>
            <div className={styles.guests__input}>
              <button
                className={styles.guests__minus}
                disabled={children === 0}
                type='button'
                onClick={() => updateChildren(children - 1)}
              >
                <span className={styles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={styles.guests__count}>
                <span>{children}</span>
              </div>
              <button
                className={styles.guests__plus}
                type='button'
                onClick={() => updateChildren(children + 1)}
              >
                <span className={styles.guests__icon}>
                  <PlusSvg />
                </span>
              </button>
            </div>
          </div>
          <div className={styles.guests__age}>
            <div className={styles.guests__group}>
              <div className={styles.guests__title}>Infants</div>
              <div className={styles.guests__variant}>Under 2</div>
            </div>
            <div className={styles.guests__input}>
              <button
                className={styles.guests__minus}
                disabled={infants === 0}
                type='button'
                onClick={() => updateInfants(infants - 1)}
              >
                <span className={styles.guests__icon}>
                  <MinusSvg />
                </span>
              </button>
              <div className={styles.guests__count}>
                <span>{infants}</span>
              </div>
              <button
                className={styles.guests__plus}
                type='button'
                onClick={() => updateInfants(infants + 1)}
              >
                <span className={styles.guests__icon}>
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
