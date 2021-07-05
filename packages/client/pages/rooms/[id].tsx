import {
  ProtectSvg,
  ReviewSvg,
  RightArrowSvg,
  SuperHostSvg,
} from '@airbnb-clone/controller';
import { memo, useEffect, useRef } from 'react';
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
import { useCalendarStore } from '../../stores/useCalendarStore';
import shallow from 'zustand/shallow';
import { RoomSkeleton } from '../../components/RoomSkeleton';
import { dynamicSvgs } from '../../constants/dynamicSvgs';
import Link from 'next/link';
import Image from 'next/image';

import 'react-datepicker/dist/react-datepicker.css';

interface RoomProps {}

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
  const [startDate, endDate, updateEnd, updateStart] = useCalendarStore(
    (state) => [
      state.startDate,
      state.endDate,
      state.updateEnd,
      state.updateStart,
    ],
    shallow
  );
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

  if (!loading && !data) {
    return (
      <div>
        <div>Failed to load listing</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (!data && loading) {
    return (
      <Layout filter room search>
        <RoomSkeleton styles={styles} Wrapper={SectionWrapper} />
      </Layout>
    );
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
            <div className={styles.room__section__padding}>
              <div className={styles.room__section__margin}>
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
                              selected={startDate}
                              onChange={(date) => updateStart(date as Date)}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                            />
                            <DatePicker
                              inline
                              selected={endDate}
                              onChange={(date) => updateEnd(date as Date)}
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
              roomStyles={styles}
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

          <div className={styles.room__section__flex}>
            <div className={styles.room__section__padding}>
              <div className={styles.room__section__margin}>
                <div className={styles.section__divider}></div>
                <div className={styles.section__padding}>
                  <div className={styles.hosted__container}>
                    <div className={styles.profile__img__margin}>
                      <Link href='/users/'>
                        <a className={styles.profile__btn}>
                          <div className={styles.profile__img}>
                            <Image
                              src='https://a0.muscache.com/im/pictures/user/061f66a1-0515-48be-a24a-c6eda9772651.jpg?im_w=240'
                              height='100%'
                              width='100%'
                              layout='responsive'
                              objectFit='cover'
                            />
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className={styles.amenities__heading__container}>
                      <h2 className={styles.section__heading}>
                        Hosted by Sergiu
                      </h2>
                      <div className={styles.calendar__range}>
                        Joined in May 2021
                      </div>
                    </div>
                  </div>

                  <div className={styles.amenities__list__grid}>
                    <div className={styles.amenity__item__container}>
                      <div className={styles.contact__margin}>
                        <Link href={`/contact_host/${data?.listing?.id!}`}>
                          <a className={styles.contact__btn}>Contact host</a>
                        </Link>
                      </div>
                    </div>

                    <div className={styles.protect__payment__margin}>
                      <div className={styles.protect__payment__flex}>
                        <div className={styles.protect__svg__margin}>
                          <ProtectSvg />
                        </div>
                        To protect your payment, never transfer money or
                        communicate outside of the Airbnb website or app.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

export default withApollo({ ssr: true })(Room);
