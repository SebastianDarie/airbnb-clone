import {
  AnonymousUserSvg,
  GlobeSvg,
  HamburgerSvg,
  MeQuery,
  WithLogoutProps,
} from '@second-gear/controller';
import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import styles from '../../sass/components/NavSettings.module.scss';
import { getInitialCln } from '../../utils/getInitialCln';
import { MenuLink } from './MenuLink';

type NavSettingsProps = {
  data: MeQuery | undefined;
  filter: boolean;
  scrolled: boolean;
  search: boolean;
} & WithLogoutProps;

export const NavSettings: React.FC<NavSettingsProps> = React.memo(
  ({ data, filter, scrolled, search, logout }) => {
    const apolloClient = useApolloClient();
    const menu = useRef<HTMLDivElement | null>(null);

    const [active, setActive] = useState<boolean>(false);

    const handleClickOutside = () => {
      setActive(false);
    };

    const ref = useOnclickOutside(handleClickOutside);

    return (
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.btn__container}>
            <Link href='/create-listing/property-type-group'>
              <a
                className={getInitialCln(
                  styles.host__link,
                  styles.link__scroll,
                  search,
                  filter ? filter : scrolled
                )}
              >
                <div className={styles.link__text}>Become a host</div>
              </a>
            </Link>
            <div>
              <button
                className={getInitialCln(
                  styles.globe__btn,
                  styles.link__scroll,
                  search,
                  filter ? filter : scrolled
                )}
              >
                <div className={styles.link__text}>
                  <div className={styles.icon__container}>
                    <GlobeSvg />
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className={styles.widget__container} ref={ref}>
              <button
                className={styles.widget__btn}
                id={getInitialCln(
                  undefined,
                  styles.btn,
                  search,
                  filter ? filter : scrolled
                )}
                onClick={() => {
                  setActive(!active);
                }}
              >
                <HamburgerSvg />
                <div className={styles.profile__container}>
                  {data?.me ? (
                    <img
                      className={styles.profile__img}
                      src='https://res.cloudinary.com/dryhgptoc/image/upload/v1622364566/jngkp0wf1yvgbfpcjb9n.png'
                    />
                  ) : (
                    <AnonymousUserSvg />
                  )}
                </div>

                {data?.me ? <div className={styles.notification}>1</div> : null}
              </button>

              <div
                className={styles.menu}
                ref={menu}
                style={{
                  display: `${active ? 'block' : 'none'}`,
                }}
              >
                <div>
                  {data?.me ? (
                    <>
                      <MenuLink href='/inbox' light={false}>
                        Messages
                      </MenuLink>
                      <MenuLink href='/notifications' light={false}>
                        Notifications
                        <div className={styles.menu__notif}></div>
                      </MenuLink>
                      <MenuLink href='/trips' light={false}>
                        Trips
                      </MenuLink>
                      <MenuLink href='/wishlists' light={false}>
                        Wishlists
                      </MenuLink>
                    </>
                  ) : (
                    <>
                      <MenuLink href='/login' light={false}>
                        Log in
                      </MenuLink>
                      <MenuLink href='/register' light>
                        Sign up
                      </MenuLink>
                    </>
                  )}
                  <div className={styles.hline}></div>
                  <MenuLink href='/host/homes' light>
                    Host your home
                  </MenuLink>
                  <MenuLink href='/host/experiences' light>
                    Host an experience
                  </MenuLink>
                  <MenuLink
                    href={data?.me ? '/account-settings' : '/help'}
                    light
                  >
                    {data?.me ? 'Account' : 'Help'}
                  </MenuLink>
                  {data?.me ? (
                    <>
                      <div className={styles.hline}></div>
                      <MenuLink href='/help' light>
                        Help
                      </MenuLink>
                      <MenuLink
                        href=''
                        light
                        onClick={async () => {
                          await logout();
                          await apolloClient.resetStore();
                        }}
                      >
                        Logout
                      </MenuLink>{' '}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
);
