import { RightArrowSvg, SuperHostSvg } from '@airbnb-clone/controller';
import { memo, RefObject, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import shallow from 'zustand/shallow';
import { FloorPlanDetails } from '../../components/FloorPlanDetails';
import Layout from '../../components/Layout';
import { BookRoomMenu } from '../../components/Room/BookRoomMenu';
import { Header } from '../../components/Room/Header';
import { Highlights } from '../../components/Room/Highlights';
import { ImageGallery } from '../../components/Room/ImageGallery';
import { ProfileSection } from '../../components/Room/ProfileSection';
import { ReviewsSection } from '../../components/Room/ReviewsSection';
import { RoomSkeleton } from '../../components/RoomSkeleton';
import { dynamicSvgs } from '../../constants/dynamicSvgs';
import styles from '../../sass/pages/Room.module.scss';
import { useGetListingFromUrl } from '../../shared-hooks/useGetListingFromUrl';
import ReservationStore from '../../stores/useReservationStore';
import { withApollo } from '../../utils/withApollo';

const getDimensions = (el: HTMLDivElement) => {
  const { height } = el.getBoundingClientRect();
  const offsetTop = el.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (el: HTMLDivElement, pos: ScrollLogicalPosition) => {
  el.scrollIntoView({
    behavior: 'smooth',
    block: pos,
    inline: pos,
  });
};

interface RoomProps {}

const SectionWrapper: React.FC<{
  photosRef?: RefObject<HTMLDivElement>;
}> = ({ photosRef, children }) => {
  return (
    <div className={styles.room__section__flex} ref={photosRef}>
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
  const [startDate, endDate] = ReservationStore.useReservationStore(
    (state) => [state.startDate, state.endDate],
    shallow
  );
  const [visibleSection, setVisibleSection] = useState<string | undefined>('');
  const nav = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [
    { section: 'Photos', ref: photosRef },
    { section: 'Amenities', ref: amenitiesRef },
    { section: 'Reviews', ref: reviewsRef },
    { section: 'Location', ref: locationRef },
  ];

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

  const onScroll = () => {
    if (nav.current) {
      if (window.pageYOffset >= 490) {
        nav.current.style.visibility = 'visible';
      } else {
        nav.current.style.visibility = 'hidden';
      }
    }

    if (nav.current) {
      const { height: headerHeight } = getDimensions(nav.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  let nights: number = 0;
  if (startDate && endDate) {
    nights = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000)
    );
  }

  return (
    <Layout filter room search>
      <div className={styles.inherit__div}>
        <div className={styles.display__div}>
          <SectionWrapper>
            <Header city={data?.listing?.city!} title={data?.listing?.title!} />
          </SectionWrapper>

          <SectionWrapper photosRef={photosRef}>
            <div className={styles.display__div}>
              <ImageGallery photos={data?.listing?.photos!} />
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
                        <button
                          className={styles.room__navbar__btn}
                          onClick={() => {
                            if (photosRef.current)
                              scrollTo(photosRef.current, 'start');
                          }}
                        >
                          <div className={styles.btn__padding}>Photos</div>
                        </button>
                      </div>
                      <div className={styles.room__navbar__item}>
                        <button
                          className={styles.room__navbar__btn}
                          onClick={() => {
                            if (amenitiesRef.current)
                              scrollTo(amenitiesRef.current, 'start');
                          }}
                        >
                          <div className={styles.btn__padding}>Amenities</div>
                        </button>
                      </div>
                      <div className={styles.room__navbar__item}>
                        <button
                          className={styles.room__navbar__btn}
                          onClick={() => {
                            if (reviewsRef.current)
                              scrollTo(reviewsRef.current, 'end');
                          }}
                        >
                          <div className={styles.btn__padding}>Reviews</div>
                        </button>
                      </div>
                      <div className={styles.room__navbar__item}>
                        <button
                          className={styles.room__navbar__btn}
                          onClick={() => {
                            if (locationRef.current)
                              scrollTo(locationRef.current, 'start');
                          }}
                        >
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
                          Entire {data?.listing?.type} hosted by{' '}
                          {data?.listing?.creator.name}
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
                                  src={`${data?.listing?.creator.photoUrl}`}
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
                  <div className={styles.display__div} ref={amenitiesRef}>
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
                          {startDate && endDate
                            ? `${nights} nights in ${data?.listing?.city}`
                            : 'Select check-in date'}
                        </h2>
                      </div>

                      <div className={styles.calendar__range}>
                        <div className={styles.calendar__availability}>
                          {startDate && endDate
                            ? startDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }) +
                              '-' +
                              endDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Add your travel dates for exact pricing'}
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
                              onChange={(date) =>
                                ReservationStore.updateStart(date as Date)
                              }
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                            />
                            <DatePicker
                              inline
                              selected={endDate}
                              onChange={(date) =>
                                ReservationStore.updateEnd(date as Date)
                              }
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
              id={data?.listing?.id!}
              dates={startDate && endDate ? [startDate, endDate] : []}
              guests={data?.listing?.guests!}
              nights={nights}
              price={data?.listing?.price!}
              roomStyles={styles}
            />
          </div>

          <ReviewsSection styles={styles} />

          <div className={styles.room__section__flex} ref={locationRef}>
            {/* map stuff here */}
          </div>

          <ProfileSection
            id={data?.listing?.id!}
            owner={data?.listing?.creator!}
            styles={styles}
          />
        </div>
      </div>
    </Layout>
  );
});

export default withApollo({ ssr: true })(Room);