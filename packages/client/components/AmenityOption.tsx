import styles from '../sass/components/AmenityOption.module.scss';

interface AmenityOptionProps {
  option: string;
}

export const AmenityOption: React.FC<AmenityOptionProps> = ({ option }) => {
  return (
    <div className={styles.grow__div}>
      <div className={styles.padding__around}>
        <button className={styles.amenity__btn}>
          <span className={styles.amenity__text}>{option}</span>
        </button>
      </div>
    </div>
  );
};
