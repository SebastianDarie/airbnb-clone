import styles from '../sass/components/RadioButton.module.scss';
import { RadioButtonProps } from '../types';

export const RadioButton: React.FC<RadioButtonProps> = ({
  delay,
  option,
  description,
  selected,
  src,
  withImage = true,
}) => {
  let content = withImage ? (
    <>
      <div className={styles.option__margin}>
        <div className={styles.option__text}>{option}</div>
      </div>
      <div className={styles.img__margin}>
        <div className={styles.img__position}>
          <img src={src} className={styles.house__img} />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.type__margin}>
        <div className={styles.option__text}>{option}</div>
        <div className={styles.option__description}>{description}</div>
      </div>
    </>
  );

  return (
    <div
      className={styles.position__container}
      style={{ animationDelay: delay }}
    >
      <button
        className={selected ? styles.btn__radio__checked : styles.btn__radio}
        onClick={async () => {
          if (withImage) {
            (await import('../stores/useListingStore')).default.selectCategory(
              option
            );
          } else {
            (await import('../stores/useListingStore')).default.selectType(
              option
            );
          }
        }}
      >
        {content}
      </button>
    </div>
  );
};
