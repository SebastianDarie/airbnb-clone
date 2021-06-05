import { NavSettings } from './NavSettings';
import styles from '../../sass/components/Navbar.module.scss';
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
      className={
        scrolled ? styles.Navbar__header__scroll : styles.Navbar__header
      }
    >
      <div className={styles.Navbar__container}>
        <div className={styles.Navbar__icon__wrapper}>
          <Link href='/'>
            <a
              className={
                scrolled ? styles.Navbar__link__scroll : styles.Navbar__link
              }
              id={styles.Navbar__link}
            >
              {data?.me ? <AirbnbSvg classname={styles.Navbar__icon} /> : null}
              <AirbnbSmallSvg
                fill={data?.me ? 'currentColor' : '#222222'}
                // classname={
                //   data?.me ? styles.Navbar__icon__small : styles.Navbar__icon
                // }
                classname={''}
              />
            </a>
          </Link>
        </div>

        {search ? <SearchForm scrolled={scrolled} /> : null}

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
