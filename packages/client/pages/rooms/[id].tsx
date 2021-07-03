import {
  ReviewSvg,
  RightArrowSvg,
  SuperHostSvg,
} from '@airbnb-clone/controller';
import dynamic from 'next/dynamic';
import { memo, useEffect, useRef, useState } from 'react';
import { FloorPlanDetails } from '../../components/FloorPlanDetails';
import Layout from '../../components/Layout';
import { BookRoomMenu } from '../../components/Room/BookRoomMenu';
import { Header } from '../../components/Room/Header';
import { Highlights } from '../../components/Room/Highlights';
import { ImageGallery } from '../../components/Room/ImageGallery';
import styles from '../../sass/pages/Room.module.scss';
import { useGetListingFromUrl } from '../../shared-hooks/useGetListingFromUrl';
import { useToggle } from '../../shared-hooks/useToggle';
import { withApollo } from '../../utils/withApollo';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface RoomProps {}

const dynamicSvgs = {
  Airconditioning: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.AirConditioningSvg)
  ),
  Carbondioxidealarm: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.CarbonSvg)
  ),
  //Dryer: dynamic<{}>(() => import('@airbnb-clone/controller').then(mod => mod.DryerSvg)),
  Freestreetparking: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.CarSvg)
  ),
  Kitchen: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.KitchenSvg)
  ),
  Microwave: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.MicrowaveSvg)
  ),
  Refrigerator: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.RefrigeratorSvg)
  ),
  Smokealarm: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.SmokeSvg)
  ),
  TV: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.TVSvg)
  ),
  Washer: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.WasherSvg)
  ),
  Wifi: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.WifiSvg)
  ),
};

const SectionWrapper: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.room__section__flex}>
      <div className={styles.room__section__padding}>
        <div className={styles.room__section__margin}>
          <div className={styles.room__section__top}>{children}</div>
        </div>
      </div>
    </div>
  );
};

const Room: React.FC<RoomProps> = memo(({}) => {
  const { data, loading, error } = useGetListingFromUrl();
  const [startDate, setStartDate] = useState(new Date());
  const monthLater = new Date();
  monthLater.setDate(monthLater.getDate() + 7);
  const [endDate, setEndDate] = useState(monthLater);
  const [isHovered, toggleHover] = useToggle(false);
  const nav = useRef<HTMLDivElement | null>(null);

  const onScroll = () => {
    if (nav.current) {
      if (window.pageYOffset >= 490) {
        nav.current.style.visibility = 'visible';
      } else {
        nav.current.style.visibility = 'hidden';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!data && loading) {
    return <>loading...</>;
  }

  if (!data && error) {
    return <>error...</>;
  }

  return (
    <Layout filter room search>
      <div className={styles.inherit__div}>
        <div className={styles.display__div}>
          <SectionWrapper>
            <Header city={data?.listing?.city!} title={data?.listing?.title!} />
          </SectionWrapper>

          <SectionWrapper>
            <div className={styles.display__div}>
              <ImageGallery
                isHovered={isHovered}
                photos={data?.listing?.photos!}
                toggleHover={toggleHover}
              />
            </div>
          </SectionWrapper>

          <div
            className={styles.room__navbar__container}
            style={{ visibility: 'hidden' }}
            ref={nav}
          >
            <div className={styles.reviews__padding}>
              <div className={styles.reviews__margin}>
                <div className={styles.room__navbar__align}>
                  <div className={styles.room__section__flex}>
                    <div className={styles.room__navbar__font}>
                      <div className={styles.room__navbar__item}>
                        <button className={styles.room__navbar__btn}>
                          <div className={styles.btn__padding}>Photos</div>
                        </button>
                      </div>
                      <div className={styles.room__navbar__item}>
                        <button className={styles.room__navbar__btn}>
                          <div className={styles.btn__padding}>Amenities</div>
                        </button>
                      </div>
                      <div className={styles.room__navbar__item}>
                        <button className={styles.room__navbar__btn}>
                          <div className={styles.btn__padding}>Reviews</div>
                        </button>
                      </div>
                      <div className={styles.room__navbar__item}>
                        <button className={styles.room__navbar__btn}>
                          <div className={styles.btn__padding}>Location</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.room__description__section}>
            <div className={styles.description__side}>
              <div className={styles.room__section__flex}>
                <div className={styles.title__padding}>
                  <div className={styles.display__div}>
                    <div className={styles.title__profile__flex}>
                      <div className={styles.title__grow}>
                        <div className={styles.room__title}>
                          Entire {data?.listing?.type} hosted by Sergiu
                        </div>
                        <div>
                          <FloorPlanDetails
                            bathrooms={data?.listing?.bathrooms!}
                            bedrooms={data?.listing?.bedrooms!}
                            beds={data?.listing?.beds!}
                            guests={data?.listing?.guests!}
                          />
                        </div>
                      </div>

                      <div className={styles.profile__margin}>
                        <div className={styles.profile__font}>
                          <div className={styles.profile__size}>
                            <button className={styles.profile__btn}>
                              <div className={styles.profile}>
                                <img
                                  className={styles.profile__img}
                                  src='https://a0.muscache.com/im/pictures/user/061f66a1-0515-48be-a24a-c6eda9772651.jpg?im_w=240'
                                />
                              </div>
                            </button>
                            <div className={styles.superhost__position}>
                              <SuperHostSvg />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.room__section__flex}>
                <div className={styles.section__divider}></div>
                <Highlights type={data?.listing?.type!} />
              </div>

              <div className={styles.room__section__flex}>
                <div className={styles.section__divider}></div>
                <div className={styles.description__padding}>
                  <div className={styles.description__snippet__container}>
                    <span>{data?.listing?.description}</span>
                  </div>
                  <div className={styles.display__div}>
                    <div className={styles.show__more__margin}>
                      <button className={styles.show__more__btn}>
                        <span className={styles.show__more__flex}>
                          <span>Show more</span>
                          <span className={styles.show__more__arrow}>
                            <RightArrowSvg />
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.room__section__flex}>
                <div className={styles.section__divider}></div>
                <div className={styles.section__padding}>
                  <div className={styles.amenities__heading__padding}>
                    <div className={styles.amenities__heading__container}>
                      <h2 className={styles.section__heading}>
                        What this place offers
                      </h2>
                    </div>
                  </div>

                  <div className={styles.amenities__list__grid}>
                    {data?.listing?.amenities.slice(0, 10).map((amenity, i) => {
                      let C =
                        dynamicSvgs[amenity.replace(/\s+/g, '') as 'Wifi'];
                      return (
                        <div
                          key={i}
                          className={styles.amenity__item__container}
                        >
                          <div className={styles.amenity__max__container}>
                            <div>{amenity}</div>
                            <div className={styles.amenity__svg__container}>
                              {C !== undefined ? <C /> : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.room__section__flex}>
                <div className={styles.section__divider}></div>
                <div className={styles.section__padding}>
                  <div>
                    <div>
                      <div className={styles.amenities__heading__container}>
                        <h2 className={styles.section__heading}>
                          {Math.floor(
                            (endDate.getTime() - startDate.getTime()) /
                              (60 * 60 * 24 * 1000)
                          )}{' '}
                          nights in {data?.listing?.city}
                        </h2>
                      </div>

                      <div className={styles.calendar__range}>
                        <div className={styles.calendar__availability}>
                          Jul 9, 2021 - Jul 14, 2021
                        </div>
                      </div>
                    </div>
                    <div className={styles.calendar__overflow__container}>
                      <div className={styles.calendar__margin__container}>
                        <div className={styles.calendar__minheight}>
                          <div className={styles.calendar__width}>
                            <DatePicker
                              inline
                              isClearable
                              selected={startDate}
                              onChange={(date) => setStartDate(date as any)}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                            />
                            <DatePicker
                              inline
                              isClearable
                              selected={endDate}
                              onChange={(date) => setEndDate(date as any)}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BookRoomMenu
              dates={[
                startDate.toLocaleDateString('en-GB'),
                endDate.toLocaleDateString('en-GB'),
              ]}
              guests={data?.listing?.guests!}
              price={data?.listing?.price!}
            />
          </div>

          <div className={styles.room__section__flex}>
            <div className={styles.room__section__padding}>
              <div className={styles.room__section__margin}>
                <div className={styles.section__divider}></div>
                <div className={styles.section__padding}>
                  <div className={styles.reviews__header__padding}>
                    <h2 className={styles.section__heading}>
                      <span className={styles.svg__margin}>
                        <ReviewSvg />
                      </span>
                      <span>5.0 · 9 reviews</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.room__section__flex}>
            {/* map stuff here */}
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default withApollo({ ssr: true })(Room);
