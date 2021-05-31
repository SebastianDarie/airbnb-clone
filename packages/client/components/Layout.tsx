import React, { ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import Navbar from './Navbar/Navbar';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const apolloClient = useApolloClient();

  return (
    <div>
      <Navbar />

      <main>
        <div style={{ minHeight: 400, overflowAnchor: 'none' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              position: 'relative',
              height: '554px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <picture>
                  <source
                    srcSet='https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=2560 1x, https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=2560 2x'
                    media='(min-width: 1440px)'
                  />
                  <source
                    srcSet='https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=960 1x, https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=1920 2x'
                    media='(min-width: 950px)'
                  />
                  <source
                    srcSet='https://a0.muscache.com/im/pictures/090a6d00-576a-465e-b946-8d26ebedbe10.jpg?im_w=720 1x, https://a0.muscache.com/im/pictures/090a6d00-576a-465e-b946-8d26ebedbe10.jpg?im_w=1440 2x'
                    media='(min-width: 744px)'
                  />
                  <source srcSet='https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=320 1x, https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=720 2x' />
                  <img
                    style={{
                      position: 'absolute',
                      objectFit: 'cover',
                      verticalAlign: 'bottom',
                      height: '100%',
                      width: '100%',
                    }}
                    src='https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_q=highq&im_w=720'
                  />
                </picture>
                <div
                  style={{
                    display: 'none',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '100%',
                    width: '100%',
                    backgroundImage:
                      'url(https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=720)',
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <div className=''>
              {/* add pd and mg */}
              <div style={{ width: '100%' }}>
                <section>
                  <div></div>
                  <div></div>
                </section>
                <div>
                  <div className='_1dv5cye'>
                    <a
                      className='_1tp1o9s'
                      href='/s/Chișinau/homes?place_id=ChIJoWm3KDZ8yUARPN1JVzDW0Tc&amp;refinement_paths%5B%5D=%2Fhomes&amp;search_type=section_navigation'
                    >
                      <span className='_14aq8wg'>
                        <div className='_1h6n1zu'>
                          <picture>
                            <source
                              srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                              media='(max-width: 743px)'
                            />
                            <source
                              srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                              media='(min-width: 743.1px) and (max-width: 1127px)'
                            />
                            <source
                              srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                              media='(min-width: 1127.1px) and (max-width: 1439px)'
                            />
                            <source
                              srcSet='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 1x, https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=240 2x'
                              media='(min-width: 1439.1px)'
                            />
                            <img
                              className='_6tbg2q'
                              aria-hidden='true'
                              alt=''
                              decoding='async'
                              src='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=720'
                              data-original-uri='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?aki_policy=large'
                            />
                          </picture>
                          <div className='_15p4g025'></div>
                        </div>
                      </span>
                    </a>
                    <span className='_1i13tcg'>
                      <span className='_pihus2'>
                        <b>Chișinau</b>
                      </span>
                      <span className='_pihus2'>15 minute drive</span>
                    </span>
                  </div>

                  <img
                    className='_6tbg2q'
                    aria-hidden='true'
                    alt=''
                    decoding='async'
                    src='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=720'
                    data-original-uri='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?aki_policy=large'
                  />
                  <img
                    className='_6tbg2q'
                    aria-hidden='true'
                    alt=''
                    decoding='async'
                    src='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&amp;im_w=720'
                    data-original-uri='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?aki_policy=large'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
