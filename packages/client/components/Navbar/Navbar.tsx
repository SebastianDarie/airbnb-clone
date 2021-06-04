import { NavSettings } from './NavSettings';
import { Searchbar } from './Searchbar';
import styles from '../../sass/components/Navbar.module.scss';
import {
  AirbnbSmallSvg,
  AirbnbSvg,
  SearchSvg,
  useMeQuery,
  withLogout,
  WithLogoutProps,
} from '@airbnb-clone/controller';
import { useScrollHandler } from '../../shared-hooks/useScrollHandler';
import { isServer } from '../../utils/isServer';

type NavbarProps = {} & WithLogoutProps;

const Navbar: React.FC<NavbarProps> = ({ logout }) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const scrolled = useScrollHandler();

  console.log(scrolled);

  return (
    // change class on scroll
    <header
      className={
        scrolled ? styles.Navbar__header__scroll : styles.Navbar__header
      }
    >
      <div className={styles.Navbar__container}>
        <div className={styles.Navbar__icon__wrapper}>
          <a
            className={
              scrolled ? styles.Navbar__link__scroll : styles.Navbar__link
            }
            id={styles.Navbar__link}
            href='/'
          >
            {data?.me ? <AirbnbSvg classname={styles.Navbar__icon} /> : null}
            <AirbnbSmallSvg
              fill={data?.me ? 'currentcolor' : '#222222'}
              // classname={
              //   data?.me ? styles.Navbar__icon__small : styles.Navbar__icon
              // }
              classname={''}
            />
          </a>
        </div>

        <div className={styles.Navbar__links}>
          {/* change this one as well */}
          <div
            className={
              scrolled
                ? styles.Navbar__searchbar__small__scroll
                : styles.Navbar__searchbar__small
            }
          >
            <div
              className={styles.Navbar__search__small}
              id={scrolled ? styles.Navbar__search : undefined}
              role='search'
            >
              <button
                className={styles.Navbar__search__small__btn}
                type='button'
              >
                <div className={styles.Navbar__search__small__text}>
                  Start your search
                </div>
                <div
                  className={styles.Navbar__search__small__icon}
                  data-icon='true'
                >
                  <SearchSvg />
                </div>
              </button>
            </div>
          </div>

          {/* change this one as well */}
          <div
            className={
              scrolled
                ? styles.Navbar__search__container__scroll
                : styles.Navbar__search__container
            }
          >
            <form className={styles.Navbar__search__form}>
              <fieldset className={styles.Navbar__search__fieldset}>
                <div className={styles.Navbar__search__options}>
                  <label htmlFor='stays'>
                    <input
                      className={styles.Navbar__search__radio}
                      id='stays'
                      type='radio'
                      role='tab'
                      value='/homes'
                      checked
                      aria-selected
                    />
                    <span
                      className={styles.Navbar__search__fieldset__text}
                      id={scrolled ? styles.Navbar__text__scroll : undefined}
                    >
                      Places to stay
                    </span>
                  </label>
                  <label>
                    <input
                      className={styles.Navbar__search__radio}
                      type='radio'
                    />
                    <span
                      className={styles.Navbar__search__fieldset__text}
                      id={scrolled ? styles.Navbar__text__scroll : undefined}
                    >
                      Experiences
                    </span>
                  </label>
                  <div>
                    <a className={styles.Navbar__search__link} href='/'>
                      <div
                        className={styles.Navbar__search__div}
                        id={scrolled ? styles.Navbar__text__scroll : undefined}
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

        <NavSettings
          data={data}
          loading={loading}
          scrolled={scrolled}
          logout={logout}
        />
      </div>
    </header>
  );
};

export default withLogout(Navbar);
