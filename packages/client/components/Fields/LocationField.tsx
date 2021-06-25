import BingMapsReact from 'bingmaps-react';
import React from 'react';
import styles from '../../sass/layout/Location.module.scss';

interface LocationFieldProps {}

export const LocationField: React.FC<LocationFieldProps> = ({}) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.search__form}>
          <div className={styles.inner__padding}>
            <div className={styles.margin__container}>
              <div className={styles.inner__flex}>
                <div className={styles.svg__flex}>
                  <div className={styles.svg__padding}>
                    <svg
                      viewBox='0 0 16 16'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      display='block'
                      height='24px'
                      width='24px'
                      fill='currentColor'
                    >
                      <path d='M8 .5C4.963.5 2.5 3 2.5 6s1.833 6.084 5.5 9.25C11.666 12.084 13.5 9 13.5 6A5.5 5.5 0 0 0 8 .5zM8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'></path>
                    </svg>
                  </div>
                </div>

                <label htmlFor='location' className={styles.label}>
                  <input
                    id='location'
                    className={styles.location__input}
                    placeholder='Enter your address'
                    type='text'
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <BingMapsReact
          bingMapsKey={process.env.NEXT_PUBLIC_BING_MAPS_API_KEY}
          height='calc(100vh - 80px)'
          mapOptions={{
            customMapStyle: {
              version: '1.0',
              settings: {
                landColor: '#e7e6e5',
                shadedReliefVisible: false,
              },
              elements: {
                vegetation: {
                  fillColor: '#c5dea2',
                },
                naturalPoint: {
                  visible: false,
                  labelVisible: false,
                },
                transportation: {
                  labelOutlineColor: '#ffffff',
                  fillColor: '#ffffff',
                  strokeColor: '#d7d6d5',
                },
                water: {
                  fillColor: '#b1bdd6',
                  labelColor: '#ffffff',
                  labelOutlineColor: '#9aa9ca',
                },
                structure: {
                  fillColor: '#d7d6d5',
                },
                indigenousPeoplesReserve: {
                  visible: false,
                },
                military: {
                  visible: false,
                },
              },
            },
            navigationBarMode: 'square',
            showBreadcrumb: true,
          }}
          viewOptions={{
            zoom: 8,
          }}
        />
      </div>
    </div>
  );
};
