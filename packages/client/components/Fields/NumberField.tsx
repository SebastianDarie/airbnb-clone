import { MinusSvg, PlusSvg } from '@airbnb-clone/controller';
import styles from '../../sass/components/GuestsMenu.module.scss';

type NumberFieldProps = {
  label: string;
};

export const NumberField: React.FC<NumberFieldProps> = ({ label }) => {
  return (
    <>
      <div className={styles.field}>
        <div className={styles.Searchbar__guests__age}>
          <div className={styles.Searchbar__guests__group}>
            <div className={styles.Searchbar__guests__title}>{label}</div>
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
              <span className={styles.Searchbar__guests__value__hidden}>0</span>
            </div>
            <button className={styles.Searchbar__guests__plus} type='button'>
              <span className={styles.Searchbar__guests__icon}>
                <PlusSvg />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
