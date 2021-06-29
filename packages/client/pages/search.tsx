import shallow from 'zustand/shallow';
import { FiltersSvg, useSearchListingsQuery } from '../../controller/dist';
import Layout from '../components/Layout';
import { useSearchStore } from '../stores/useSearchStore';
import { withApollo } from '../utils/withApollo';
import { ListingCard } from '../components/ListingCard';
import styles from '../sass/pages/Search.module.scss';
import { useState } from 'react';
import { AmenityOption } from '../components/AmenityOption';

interface SearchProps {}

const amenityFilters = [
  'Wifi',
  'Kitchen',
  'Air conditioning',
  'Washer',
  'Iron',
  'Pets allowed',
  'Dedicated workspace',
  'Free parking',
  'Dryer',
  'Self check-in',
  'Pool',
  'Gym',
];

const Search: React.FC<SearchProps> = ({}) => {
  //const [amenities] = useState(amenityFilters)
  const [latitude, longitude, adults, children, infants] = useSearchStore(
    (state) => [
      state.latitude,
      state.longitude,
      state.adults,
      state.children,
      state.infants,
    ],
    shallow
  );
  const { data, error, loading } = useSearchListingsQuery({
    variables: {
      input: { latitude, longitude, guests: adults + children + infants },
      limit: 20,
      cursor: null,
    },
  });

  if (!data && loading) {
    return <div>loading...</div>;
  }

  if (!data && error) {
    return (
      <>
        <div>Failed To Load Listings</div>
        <div>{error.message}</div>
      </>
    );
  }

  console.log(latitude, longitude);
  console.log(data, error, loading);

  return (
    <Layout filter search>
      <div className={styles.inset__div}>
        <div className={styles.options__bar}>
          <div className={styles.options__dimensions}>
            <div className={styles.options__padding}>
              <div className={styles.options__margin}>
                <div className={styles.options__container}>
                  <div className={styles.options__flex}>
                    <div>
                      <div className={styles.options__wrap}>
                        {amenityFilters.map((filter, i) => (
                          <AmenityOption key={i} option={filter} />
                        ))}
                      </div>
                    </div>

                    <div className={styles.filters__container}>
                      <button className={styles.filters__btn}>
                        <div className={styles.filters__flex}>
                          <div className={styles.svg__margin}>
                            <FiltersSvg />
                          </div>
                          <span className={styles.filters__text}>Filters</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.stays__container}>
          <div style={{ paddingTop: 68 }}>
            <div style={{ width: '100%' }}>
              <div className={styles.meta__padding}>
                <div className={styles.top__padding}>
                  <div className={styles.stays__count}>
                    {data?.searchListings.hasMore
                      ? '20+ stays'
                      : `${data?.searchListings.listings.length} listings`}
                  </div>
                  <div className={styles.stays__header}>
                    <h1 className={styles.heading}>
                      Stays in selected map area
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.listings__container}>
              <div style={{ overflowAnchor: 'none' }}>
                <div className={styles.listings__section}>
                  <div className={styles.listings__padding}>
                    <div className={styles.listings__margin}>
                      {data &&
                        data.searchListings.listings.map((listing) => (
                          <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Search);
