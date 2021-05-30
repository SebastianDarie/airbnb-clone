import styles from '../../sass/components/Searchbar.module.scss';

interface SearchbarProps {}

export const Searchbar: React.FC<SearchbarProps> = ({}) => {
  return (
    <div className={styles.Searchbar}>
      <div className={styles.Searchbar__container}>
        <div className={styles.Searchbar__part1}>
          <div className={styles.Searchbar__part1__container}>
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
          <div className={styles.Searchbar__part2__checkin}>
            <div className={styles.Searchbar__btn} role='button'>
              <div className={styles.Searchbar__text__container}>
                <div className={styles.Searchbar__text__bold}>Check in</div>
                <div className={styles.Searchbar__text__gray}>Add dates</div>
              </div>
            </div>
          </div>

          <div className={styles.vline}></div>

          <div className={styles.Searchbar__part2__checkin}>
            <div className={styles.Searchbar__btn} role='button'>
              <div className={styles.Searchbar__text__container}>
                <div className={styles.Searchbar__text__bold}>Check out</div>
                <div className={styles.Searchbar__text__gray}>Add dates</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.vline}></div>

        <div className={styles.Searchbar__part3__container}>
          <div className={styles.Searchbar__btn}>
            <div className={styles.Searchbar__text__container}>
              <div className={styles.Searchbar__text__bold}>Guests</div>
              <div className={styles.Searchbar__text__gray}>Add guests</div>
            </div>
          </div>

          <div className={styles.Searchbar__icon__btn__container}>
            <button className={styles.Searchbar__icon__btn}>
              <div className={styles.Searchbar__inner__icon__container}>
                <div>
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
                </div>

                <div className={styles.Searchbar__hidden__text}>Search</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
