import { NavSettings } from './NavSettings';
import styles from '../../sass/layout/Navbar.module.scss';
import {
  AirbnbSmallSvg,
  AirbnbSvg,
  useMeQuery,
  withLogout,
  WithLogoutProps,
} from '@second-gear/controller';
import { useScrollHandler } from '../../shared-hooks/useScrollHandler';
import { isServer } from '../../utils/isServer';
import Link from 'next/link';
import { SearchForm } from '../Searchbar/SearchForm';
import { getInitialCln } from '../../utils/getInitialCln';

type NavbarProps = {
  isLoaded?: boolean;
  filter?: boolean;
  room?: boolean;
  search?: boolean;
} & WithLogoutProps;

const Navbar: React.FC<NavbarProps> = ({
  isLoaded = false,
  filter = false,
  room = false,
  search = false,
  logout,
}) => {
  const { data } = useMeQuery({
    skip: isServer(),
  });
  const scrolled = useScrollHandler();

  const Nav = (
    <header
      className={getInitialCln(
        styles.header,
        styles.header__scroll,
        search,
        filter ? filter : scrolled
      )}
      id={
        !room
          ? filter
            ? styles.header__search
            : undefined
          : styles.header__room
      }
    >
      <div className={styles.container}>
        <div className={styles.icon__wrapper}>
          <Link href='/'>
            <a
              className={getInitialCln(
                styles.link,
                styles.link__scroll,
                search,
                filter ? filter : scrolled
              )}
              id={styles.link}
            >
              <span className={styles.icon}>
                <AirbnbSvg />
              </span>
              <span className={styles.icon__small}>
                <AirbnbSmallSvg fill='currentColor' />
              </span>
            </a>
          </Link>
        </div>

        <SearchForm
          isLoaded={isLoaded}
          filter={filter}
          search={search}
          scrolled={scrolled}
        />

        <NavSettings
          data={data}
          filter={filter}
          scrolled={scrolled}
          search={search}
          logout={logout}
        />
      </div>
    </header>
  );

  if (filter) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.flex__after}>
          {Nav}

          <div className={styles.height__div}></div>
        </div>
      </div>
    );
  }

  return Nav;
};

export default withLogout(Navbar);
