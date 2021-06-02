import { WithLogoutProps } from '@airbnb-clone/controller';
import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import { useRef } from 'react';
import styles from '../../sass/components/NavSettings.module.scss';
import useClickAway from '../../shared-hooks/useClickAway';

type NavSettingsProps = {
  scrolled: boolean;
} & WithLogoutProps;

export const NavSettings: React.FC<NavSettingsProps> = React.memo(
  ({ scrolled, logout }) => {
    const apolloClient = useApolloClient();
    const menu = useRef<HTMLDivElement | null>(null);

    const [active, setActive] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = () => {
      setActive(false);
    };

    useClickAway(ref, handleClickOutside);

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
                    <svg
                      viewBox='0 0 16 16'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      fill='currentColor'
                      height='16'
                      width='16'
                    >
                      <path d='m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z'></path>
                    </svg>
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
                  // if (menu.current) {
                  //   menu.current.style.display === 'block'
                  //     ? (menu.current.style.display = 'none')
                  //     : (menu.current.style.display = 'block');
                  // }
                  setActive(!active);
                }}
              >
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
                  strokeWidth='3'
                  overflow='visible'
                >
                  <g fill='none' fillRule='nonzero'>
                    <path d='m2 16h28'></path>
                    <path d='m2 24h28'></path>
                    <path d='m2 8h28'></path>
                  </g>
                </svg>
                <div className={styles.UtilsNav__profile__container}>
                  <img
                    className={styles.UtilsNav__profile__img}
                    src='https://res.cloudinary.com/dryhgptoc/image/upload/v1622364566/jngkp0wf1yvgbfpcjb9n.png'
                  />
                </div>

                <div className={styles.UtilsNav__notification}>1</div>
              </button>

              <div
                className={styles.UtilsNav__menu}
                ref={menu}
                style={{
                  display: `${active ? 'block' : 'none'}`,
                }}
              >
                <div>
                  <a className={styles.UtilsNav__menu__link}>Messages</a>
                  <a className={styles.UtilsNav__menu__link}>
                    Notifications
                    <div className={styles.UtilsNav__menu__notif}></div>
                  </a>
                  <a className={styles.UtilsNav__menu__link}>Trips</a>
                  <a className={styles.UtilsNav__menu__link}>Wishlists</a>
                  <div className={styles.hline}></div>
                  <a className={styles.UtilsNav__menu__link} id={styles.thin}>
                    Host your home
                  </a>
                  <a className={styles.UtilsNav__menu__link} id={styles.thin}>
                    Host an experience
                  </a>
                  <a className={styles.UtilsNav__menu__link} id={styles.thin}>
                    Account
                  </a>
                  <div className={styles.hline}></div>
                  <a className={styles.UtilsNav__menu__link} id={styles.thin}>
                    Help
                  </a>
                  <a
                    className={styles.UtilsNav__menu__link}
                    id={styles.thin}
                    onClick={async () => {
                      await logout();
                      await apolloClient.resetStore();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: 'calc(100%-8px)',
              right: '0px',
              zIndex: 100,
            }}
          ></div>
        </nav>
      </div>
    );
  }
);
