import { SearchSvg } from '@airbnb-clone/controller';
import { Searchbar } from './Searchbar';
import styles from '../../sass/components/SearchForm.module.scss';
import { getInitialCln } from '../../utils/getInitialCln';

interface SearchFormProps {
  filter: boolean;
  search: boolean;
  scrolled: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  filter,
  search,
  scrolled,
}) => {
  const form = (
    <div className={styles.links}>
      {search ? (
        <>
          <div
            className={getInitialCln(
              styles.searchbar__small,
              styles.searchbar__small__scroll,
              search,
              filter ? filter : scrolled
            )}
          >
            <div
              className={styles.search__small}
              id={getInitialCln(
                undefined,
                styles.search,
                search,
                filter ? filter : scrolled
              )}
              role='search'
            >
              {filter ? (
                <>
                  <button className={styles.search__small__btn} type='button'>
                    <div className={styles.search__small__text}>Map area</div>
                  </button>
                  <span className={styles.search__divider}></span>
                  <button className={styles.search__small__btn} type='button'>
                    <div className={styles.search__default__text}>
                      Add dates
                    </div>
                  </button>
                  <span className={styles.search__divider}></span>
                  <button className={styles.search__small__btn} type='button'>
                    <div className={styles.search__default__text}>
                      Add guests
                    </div>
                    <div
                      className={styles.search__small__icon}
                      data-icon='true'
                    >
                      <SearchSvg />
                    </div>
                  </button>
                </>
              ) : (
                <button className={styles.search__small__btn} type='button'>
                  <div className={styles.search__small__text}>
                    Start your search
                  </div>
                  <div className={styles.search__small__icon} data-icon='true'>
                    <SearchSvg />
                  </div>
                </button>
              )}
            </div>
          </div>

          <div
            className={getInitialCln(
              styles.search__container,
              styles.search__container__scroll,
              search,
              filter ? filter : scrolled
            )}
          >
            <form className={styles.search__form}>
              <fieldset className={styles.search__fieldset}>
                <div className={styles.search__options}>
                  <label htmlFor='stays'>
                    <input
                      className={styles.search__radio}
                      id='stays'
                      type='radio'
                      role='tab'
                      value='/homes'
                      aria-selected
                      checked
                      readOnly
                    />
                    <span
                      className={styles.search__fieldset__text}
                      id={getInitialCln(
                        undefined,
                        styles.text__scroll,
                        search,
                        filter ? filter : scrolled
                      )}
                    >
                      Places to stay
                    </span>
                  </label>
                  <label>
                    <input className={styles.search__radio} type='radio' />
                    <span
                      className={styles.search__fieldset__text}
                      id={getInitialCln(
                        undefined,
                        styles.text__scroll,
                        search,
                        filter ? filter : scrolled
                      )}
                    >
                      Experiences
                    </span>
                  </label>
                  <div>
                    <a className={styles.search__link} href='/'>
                      <div
                        className={styles.search__div}
                        id={getInitialCln(
                          undefined,
                          styles.text__scroll,
                          search,
                          filter ? filter : scrolled
                        )}
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
        </>
      ) : null}
    </div>
  );

  if (filter) {
    scrolled = true;
    return form;
  }

  return form;
};
