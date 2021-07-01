import {
  CleanSvg,
  HomeSvg,
  LikeSvg,
  MedalSvg,
  ReviewSvg,
  RightArrowSvg,
  SuperHostSvg,
} from '@airbnb-clone/controller';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import { withApollo } from '../../utils/withApollo';
import styles from '../../sass/pages/Room.module.scss';
import { useGetListingFromUrl } from '../../shared-hooks/useGetListingFromUrl';
import { BookRoomMenu } from '../../components/BookRoomMenu';
import { FloorPlanDetails } from '../../components/FloorPlanDetails';
import Link from 'next/link';

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

const DoubleImageWrapper: React.FC<{ first: string; second: string }> = ({
  first,
  second,
}) => {
  return (
    <div className={styles.room__images__flex}>
      <div className={styles.room__images__container}>
        <div className={styles.room__image__top}>
          <div className={styles.room__image__relative}>
            <div className={styles.room__cover__container}>
              <img src={first} />
            </div>
          </div>
        </div>
        <div className={styles.room__image__bottom}>
          <div className={styles.room__image__relative}>
            <div className={styles.room__cover__container}>
              <img src={second} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Room: React.FC<RoomProps> = ({}) => {
  const { data, loading, error } = useGetListingFromUrl();

  return (
    <Layout search={false}>
      <div className={styles.display__div}>
        <SectionWrapper>
          <div className={styles.room__title__container}>
            <h1 className={styles.room__title}>{data?.listing?.title}</h1>
          </div>

          <div className={styles.room__header__footer}>
            <div className={styles.room__header__reviews}>
              <div className={styles.room__header__details}>
                <span>
                  <ReviewSvg />
                </span>
                <span>5.0</span>
                <Link href=''>
                  <a>
                    <span>(9 reviews)</span>
                  </a>
                </Link>
              </div>
              <span className={styles.room__header__dot}>·</span>
              <div className={styles.room__header__details}>
                <span>󰀃</span>
                <span>Superhost</span>
              </div>
              <span className={styles.room__header__dot}>·</span>
              <span className={styles.room__header__details}>
                <span className={styles.room__header__location}>
                  {data?.listing?.city}
                </span>
              </span>
            </div>
            <div className={styles.display__div}></div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className={styles.display__div}>
            <div className={styles.room__images__border}>
              <div className={styles.room__images__container}>
                <div className={styles.room__images__padding}>
                  <div className={styles.room__images__position}>
                    <div className={styles.room__cover__position}>
                      <div className={styles.room__images__container}>
                        <div className={styles.room__image__relative}>
                          <div className={styles.room__cover__container}>
                            <img src={data?.listing?.photos[0]} />
                          </div>

                          {/* <div className={styles.room__cover__hover}></div> */}
                        </div>
                      </div>
                    </div>

                    <DoubleImageWrapper
                      first={data?.listing?.photos[1]!}
                      second={data?.listing?.photos[2]!}
                    />

                    <DoubleImageWrapper
                      first={data?.listing?.photos[3]!}
                      second={data?.listing?.photos[4]!}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <div
          className={styles.room__navbar__container}
          style={{ visibility: 'hidden' }}
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
              <div className={styles.highlights__padding}>
                <div className={styles.highlight__flex}>
                  <div className={styles.highlight__svg__container}>
                    <HomeSvg />
                  </div>
                  <div className={styles.highlight__description__container}>
                    <div className={styles.highlight__title}>Entire Home</div>
                    <div className={styles.highlight__description}>
                      You'll have the {data?.listing?.type.toLowerCase()} to
                      yourself
                    </div>
                  </div>
                </div>

                <div className={styles.highlight__flex}>
                  <div className={styles.highlight__svg__container}>
                    <CleanSvg />
                  </div>
                  <div className={styles.highlight__description__container}>
                    <div className={styles.highlight__title}>
                      Enhanced Clean
                    </div>
                    <div className={styles.highlight__description}>
                      This host committed to Airbnb's 5-step enhanced cleaning
                      process.
                    </div>
                  </div>
                </div>

                <div className={styles.highlight__flex}>
                  <div className={styles.highlight__svg__container}>
                    <MedalSvg />
                  </div>
                  <div className={styles.highlight__description__container}>
                    <div className={styles.highlight__title}>
                      Sergiu is a SuperHost
                    </div>
                    <div className={styles.highlight__description}>
                      Superhosts are experienced, highly rated hosts who are
                      committed to providing great stays for guests.
                    </div>
                  </div>
                </div>

                <div className={styles.highlight__flex}>
                  <div className={styles.highlight__svg__container}>
                    <LikeSvg />
                  </div>
                  <div className={styles.highlight__description__container}>
                    <div className={styles.highlight__title}>
                      Outstanding hospitality
                    </div>
                    <div className={styles.highlight__description}>
                      4 recent guests complimented Sergiu for outstanding
                      hospitality.
                    </div>
                  </div>
                </div>
              </div>
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
                        <span>
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
                  {data?.listing?.amenities.slice(0, 10).map((amenity, i) => (
                    <div key={i} className={styles.amenity__item__container}>
                      <div className={styles.amenity__max__container}>
                        <div>{amenity}</div>
                        <div className={styles.amenity__svg__container}>
                          {dynamicSvgs[amenity.replace(/\s+/g, '') as 'Wifi']}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <BookRoomMenu
            guests={data?.listing?.guests!}
            price={data?.listing?.price!}
          />
        </div>

        <div className={styles.room__section__flex}>
          <div className={styles.reviews__padding}>
            <div className={styles.reviews__margin}>
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

        <div className={styles.room__section__flex}>{/* map stuff here */}</div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Room);
