import { CheckMarkSvg } from '@airbnb-clone/controller';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import styles from '../../sass/components/SearchControl.module.scss';

interface SearchControlProps {
  checked: boolean;
  loading: boolean;
  controlRef: MutableRefObject<HTMLDivElement | null>;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

export const SearchControl: React.FC<SearchControlProps> = ({
  checked,
  loading,
  controlRef,
  setChecked,
}) => {
  return (
    <div className={styles.control__margin} ref={controlRef}>
      <div className={styles.control__background}>
        {loading ? (
          <button className={styles.map__loader__btn}>
            <div className={styles.map__loader__control}>
              <span>
                <span
                  className={styles.square}
                  style={{ animationDelay: '-0.3s' }}
                ></span>
                <span
                  className={styles.square}
                  style={{ animationDelay: '-0.15s' }}
                ></span>
                <span className={styles.square}></span>
              </span>
            </div>
          </button>
        ) : (
          <div className={styles.control__padding}>
            <label className={styles.control__label}>
              <span className={styles.input__container}>
                <input
                  className={checked ? styles.input : styles.input__empty}
                  type='checkbox'
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                ></input>
                <span
                  className={
                    checked
                      ? styles.checkbox__container
                      : styles.checkbox__container__empty
                  }
                >
                  {checked ? (
                    <span className={styles.checkbox__svg}>
                      <CheckMarkSvg />
                    </span>
                  ) : null}
                </span>
              </span>

              <div className={styles.text__margin}>
                <span className={styles.text}>Search as I move the map</span>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
