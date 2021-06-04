import {
  AnonymousUserSvg,
  GlobeSvg,
  HamburgerSvg,
  MeQuery,
  WithLogoutProps,
} from '@airbnb-clone/controller';
import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import { useRef } from 'react';
import styles from '../../sass/components/NavSettings.module.scss';
import useClickAway from '../../shared-hooks/useClickAway';
import { MenuLink } from './MenuLink';

type NavSettingsProps = {
  data: MeQuery | undefined;
  loading: boolean;
  scrolled: boolean;
} & WithLogoutProps;

export const NavSettings: React.FC<NavSettingsProps> = React.memo(
  ({ data, loading, scrolled, logout }) => {
    const apolloClient = useApolloClient();
    const menu = useRef<HTMLDivElement | null>(null);

    const [active, setActive] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = () => {
      setActive(false);
    };

    useClickAway(ref, handleClickOutside);

    console.log(data, loading);

    return (
      <div className={styles.UtilsNav__container}>
        <nav className={styles.UtilsNav__nav}>
          <div className={styles.UtilsNav__btn__container}>
            <a
              className={
                scrolled
                  ? styles.UtilsNav__link__scroll
                  : styles.UtilsNav__host__link
              }
              href='/host/homes'
            >
              <div className={styles.UtilsNav__link__text}>Become a host</div>
            </a>
            <div>
              <button
                className={
                  scrolled
                    ? styles.UtilsNav__link__scroll
                    : styles.UtilsNav__globe__btn
                }
              >
                <div className={styles.UtilsNav__link__text}>
                  <div className={styles.UtilsNav__icon__container}>
                    <GlobeSvg />
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className={styles.UtilsNav__widget__container} ref={ref}>
              <button
                className={styles.UtilsNav__widget__btn}
                id={scrolled ? styles.UtilsNav__btn : undefined}
                onClick={() => {
                  setActive(!active);
                }}
              >
                <HamburgerSvg />
                <div className={styles.UtilsNav__profile__container}>
                  {data?.me ? (
                    <img
                      className={styles.UtilsNav__profile__img}
                      src='https://res.cloudinary.com/dryhgptoc/image/upload/v1622364566/jngkp0wf1yvgbfpcjb9n.png'
                    />
                  ) : (
                    <AnonymousUserSvg />
                  )}
                </div>

                {data?.me ? (
                  <div className={styles.UtilsNav__notification}>1</div>
                ) : null}
              </button>

              <div
                className={styles.UtilsNav__menu}
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
                        <div className={styles.UtilsNav__menu__notif}></div>
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
                      <MenuLink href='/signup' light>
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

          {/* <div
            style={{
              position: 'absolute',
              top: 'calc(100%-8px)',
              right: '0px',
              zIndex: 100,
            }}
          ></div> */}
        </nav>
      </div>
    );
  }
);
