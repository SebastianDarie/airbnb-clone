import shallow from 'zustand/shallow';
import { useSearchListingsQuery } from '@airbnb-clone/controller';
import { FiltersBar } from '../components/FiltersBar';
import Layout from '../components/Layout';
import { ListingCard } from '../components/ListingCard';
import styles from '../sass/pages/Search.module.scss';
import { useSearchStore } from '../stores/useSearchStore';
import { withApollo } from '../utils/withApollo';
import { useEffect, useRef } from 'react';
import FiltersStore, { FilterKey } from '../stores/useFiltersStore';
import { useApolloClient } from '@apollo/client';

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  const apolloClient = useApolloClient();
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

  useEffect(() => {
    apolloClient.cache.evict({ fieldName: 'searchListings:{}' });
    apolloClient.cache.gc();
  }, []);

  const { data, error, loading, variables, fetchMore } = useSearchListingsQuery(
    {
      variables: {
        input: { latitude, longitude, guests: adults + children + infants },
        limit: 20,
        cursor: null,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const filtersRef = useRef(FiltersStore.useFiltersStore.getState());

  useEffect(
    () =>
      FiltersStore.useFiltersStore.subscribe(
        (filters) => (filtersRef.current = filters as any),
        (state) => state
      ),
    []
  );

  console.log(loading);
  //const filteredListings = data?.searchListings.listings.filter(l => l.amenities)

  if (!data && error) {
    return (
      <>
        <div>Failed To Load Listings</div>
        <div>{error.message}</div>
      </>
    );
  }

  return (
    <Layout filter search>
      <div className={styles.inset__div}>
        <FiltersBar filtersRef={filtersRef} />

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
                      {data?.searchListings.listings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          loading={loading}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.padding__bottom}></div>
        </div>

        <div
          className={styles.load__more__margin}
          style={{ display: data?.searchListings.hasMore ? 'flex' : 'none' }}
        >
          <button
            className={styles.load__more__btn}
            onClick={() =>
              fetchMore({
                variables: {
                  input: variables?.input,
                  limit: variables?.limit,
                  cursor:
                    data?.searchListings.listings[
                      data.searchListings.listings.length - 1
                    ].createdAt,
                },
              })
            }
          >
            Load more
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Search);
