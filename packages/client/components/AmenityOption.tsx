interface AmenityOptionProps {
  option: string;
  selected: boolean;
  styles: {
    readonly [key: string]: string;
  };
  setFilter: (type: any, value: boolean) => void;
}

export const AmenityOption: React.FC<AmenityOptionProps> = ({
  option,
  selected,
  styles,
  setFilter,
}) => {
  return (
    <div className={styles.grow__div}>
      <div className={styles.padding__around}>
        <button
          className={
            selected ? styles.amenity__btn__selected : styles.amenity__btn
          }
          onClick={() => setFilter(option.replace(/\s+/g, ''), !selected)}
        >
          <span className={styles.amenity__text}>{option}</span>
        </button>
      </div>
    </div>
  );
};
