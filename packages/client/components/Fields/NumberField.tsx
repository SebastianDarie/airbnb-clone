import { MinusSvg, PlusSvg } from '@second-gear/controller';
import styles from '../../sass/components/GuestsMenu.module.scss';

type NumberFieldProps = {
  label: string;
  value: number;
  updateFloor: (type: string, value: number) => void;
};

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  value,
  updateFloor,
}) => {
  return (
    <>
      <div className={styles.field}>
        <div className={styles.guests__age}>
          <div className={styles.guests__group}>
            <div className={styles.guests__title__big}>{label}</div>
          </div>
          <div className={styles.guests__input}>
            <button
              className={styles.guests__minus}
              disabled={value === 1}
              type='button'
              onClick={() => updateFloor(label, value - 1)}
            >
              <span className={styles.guests__icon}>
                <MinusSvg />
              </span>
            </button>
            <div className={styles.guests__count}>
              <span>{value}</span>
            </div>
            <button
              className={styles.guests__plus}
              type='button'
              onClick={() => updateFloor(label, value + 1)}
            >
              <span className={styles.guests__icon}>
                <PlusSvg />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
