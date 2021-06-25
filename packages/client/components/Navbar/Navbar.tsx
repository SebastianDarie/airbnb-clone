import { NavSettings } from './NavSettings';
import styles from '../../sass/layout/Navbar.module.scss';
import {
  AirbnbSmallSvg,
  AirbnbSvg,
  useMeQuery,
  withLogout,
  WithLogoutProps,
} from '@airbnb-clone/controller';
import { useScrollHandler } from '../../shared-hooks/useScrollHandler';
import { isServer } from '../../utils/isServer';
import Link from 'next/link';
import { SearchForm } from '../Searchbar/SearchForm';
import { getInitialCln } from '../../utils/getInitialCln';

type NavbarProps = {
  search?: boolean;
} & WithLogoutProps;

const Navbar: React.FC<NavbarProps> = ({ search = false, logout }) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const scrolled = useScrollHandler();

  return (
    <header
      className={getInitialCln(
        styles.Navbar__header,
        styles.Navbar__header__scroll,
        search,
        scrolled
      )}
    >
      <div className={styles.Navbar__container}>
        <div className={styles.Navbar__icon__wrapper}>
          <Link href='/'>
            <a
              className={getInitialCln(
                styles.Navbar__link,
                styles.Navbar__link__scroll,
                search,
                scrolled
              )}
              id={styles.Navbar__link}
            >
              <AirbnbSvg classname={styles.Navbar__icon} />
              <AirbnbSmallSvg
                fill='currentColor'
                classname={styles.Navbar__icon__small}
              />
            </a>
          </Link>
        </div>

        <SearchForm search={search} scrolled={scrolled} />

        <NavSettings
          data={data}
          scrolled={scrolled}
          search={search}
          logout={logout}
        />
      </div>
    </header>
  );
};

export default withLogout(Navbar);
