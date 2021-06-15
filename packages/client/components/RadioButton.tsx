import styles from '../sass/components/RadioButton.module.scss';

interface RadioButtonProps {
  delay: string;
  option: string;
  selected: boolean;
  src: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  delay,
  option,
  selected,
  src,
}) => {
  return (
    <div
      className={styles.position__container}
      style={{ animationDelay: delay }}
    >
      <button
        className={selected ? styles.btn__radio__checked : styles.btn__radio}
      >
        <div className={styles.option__margin}>
          <div className={styles.option__text}>{option}</div>
        </div>
        <div className={styles.img__margin}>
          <div className={styles.img__position}>
            <img src={src} className={styles.house__img} />
          </div>
        </div>
      </button>
    </div>
  );
};

//'https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240'
