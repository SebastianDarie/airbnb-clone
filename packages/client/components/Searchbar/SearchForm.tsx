import { SearchSvg } from '@airbnb-clone/controller';
import { Searchbar } from './Searchbar';
import styles from '../../sass/components/SearchForm.module.scss';

interface SearchFormProps {
  scrolled: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ scrolled }) => {
  return (
    <div className={styles.SearchForm__links}>
      <div
        className={
          scrolled
            ? styles.SearchForm__searchbar__small__scroll
            : styles.SearchForm__searchbar__small
        }
      >
        <div
          className={styles.SearchForm__search__small}
          id={scrolled ? styles.SearchForm__search : undefined}
          role='search'
        >
          <button
            className={styles.SearchForm__search__small__btn}
            type='button'
          >
            <div className={styles.SearchForm__search__small__text}>
              Start your search
            </div>
            <div
              className={styles.SearchForm__search__small__icon}
              data-icon='true'
            >
              <SearchSvg />
            </div>
          </button>
        </div>
      </div>

      <div
        className={
          scrolled
            ? styles.SearchForm__search__container__scroll
            : styles.SearchForm__search__container
        }
      >
        <form className={styles.SearchForm__search__form}>
          <fieldset className={styles.SearchForm__search__fieldset}>
            <div className={styles.SearchForm__search__options}>
              <label htmlFor='stays'>
                <input
                  className={styles.SearchForm__search__radio}
                  id='stays'
                  type='radio'
                  role='tab'
                  value='/homes'
                  checked
                  aria-selected
                />
                <span
                  className={styles.SearchForm__search__fieldset__text}
                  id={scrolled ? styles.SearchForm__text__scroll : undefined}
                >
                  Places to stay
                </span>
              </label>
              <label>
                <input
                  className={styles.SearchForm__search__radio}
                  type='radio'
                />
                <span
                  className={styles.SearchForm__search__fieldset__text}
                  id={scrolled ? styles.SearchForm__text__scroll : undefined}
                >
                  Experiences
                </span>
              </label>
              <div>
                <a className={styles.SearchForm__search__link} href='/'>
                  <div
                    className={styles.SearchForm__search__div}
                    id={scrolled ? styles.SearchForm__text__scroll : undefined}
                  >
                    Online Experiences
                  </div>
                </a>
              </div>
            </div>
          </fieldset>

          <Searchbar scrolled={scrolled} />
        </form>
      </div>
    </div>
  );
};
