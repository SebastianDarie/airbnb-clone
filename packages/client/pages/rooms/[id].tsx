import { RightArrowSvg, SuperHostSvg } from '@airbnb-clone/controller';
import { Circle, GoogleMap } from '@react-google-maps/api';
import {
  CSSProperties,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import shallow from 'zustand/shallow';
import { FloorPlanDetails } from '../../components/FloorPlanDetails';
import Layout from '../../components/Layout';
import { BookRoomMenu } from '../../components/Room/BookRoomMenu';
import { Calendar } from '../../components/Room/Calendar';
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
import { useGoogleMaps } from '../../utils/GoogleMapsProvider';
import { withApollo } from '../../utils/withApollo';

const mapContainerStyle: CSSProperties = {
  height: '100%',
  width: '100%',
};

const options = {
  scrollwheel: false,
  zoomControl: true,
};

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
  const { data, loading, error } = useGetListingFromUrl(false);
  const [startDate, endDate] = ReservationStore.useReservationStore(
    (state) => [state.startDate, state.endDate],
    shallow
  );
  const [visibleSection, setVisibleSection] = useState<string | undefined>('');
  const mapRef = useRef<google.maps.Map<Element> | null>(null);
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

  if (loading) {
    return (
      <Layout filter room search>
        <RoomSkeleton styles={styles} Wrapper={SectionWrapper} />
      </Layout>
    );
  }

  if (error) {
    return (
      <div>
        <div>Failed to load listing</div>
        <div>{error.message}</div>
      </div>
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

  let avg = 0;
  let nights: number = 0;
  if (startDate && endDate) {
    nights = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000)
    );
  }
  if (data?.listing?.reviews) {
    for (let i = 0; i < data.listing.reviews.length; i++) {
      avg += data.listing.reviews[i].rating;
    }
  }

  const { isLoaded } = useGoogleMaps();

  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
  }, []);

  return (
    <Layout isLoaded={isLoaded} filter room search>
      <div className={styles.inherit__div}>
        <div className={styles.display__div}>
          <SectionWrapper>
            <Header
              avg={avg}
              city={data?.listing?.city}
              reviews={data?.listing?.reviews}
              title={data?.listing?.title}
            />
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
                              scrollTo(reviewsRef.current, 'start');
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

              <Calendar
                city={data?.listing?.city}
                loading={loading}
                nights={nights}
                styles={styles}
              />
            </div>

            <BookRoomMenu
              avg={avg / (data?.listing?.reviews?.length ?? 1)}
              id={data?.listing?.id!}
              maxGuests={data?.listing?.guests!}
              nights={nights}
              price={data?.listing?.price!}
              roomStyles={styles}
            />
          </div>

          {data?.listing?.reviews && (
            <ReviewsSection
              avg={avg}
              reviews={data.listing.reviews}
              styles={styles}
            />
          )}

          <div className={styles.room__section__flex} ref={locationRef}>
            <div className={styles.room__section__padding}>
              <div className={styles.room__section__margin}>
                <div className={styles.section__divider}></div>
                <div className={styles.section__padding}>
                  <div className={styles.amenities__heading__padding}>
                    <div className={styles.amenities__heading__container}>
                      <h2 className={styles.section__heading}>
                        Where you'll be
                      </h2>
                    </div>
                  </div>
                  <div className={styles.location__margin}>
                    {data?.listing?.city}
                  </div>
                  <div className={styles.map__container}>
                    {data && isLoaded ? (
                      <GoogleMap
                        id='map'
                        mapContainerStyle={mapContainerStyle}
                        center={{
                          lat: data.listing?.latitude!,
                          lng: data.listing?.longitude!,
                        }}
                        zoom={16}
                        options={options}
                        onLoad={onMapLoad}
                      >
                        <Circle
                          center={{
                            lat: data.listing?.latitude!,
                            lng: data.listing?.longitude!,
                          }}
                          radius={125}
                          options={{
                            fillColor: '#E5C8CD',
                            fillOpacity: 0.35,
                            strokeOpacity: 0,
                          }}
                        />
                      </GoogleMap>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
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
