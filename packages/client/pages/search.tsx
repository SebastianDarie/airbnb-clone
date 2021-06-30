import shallow from 'zustand/shallow';
import { useSearchListingsQuery } from '../../controller/dist';
import { FiltersBar } from '../components/FiltersBar';
import Layout from '../components/Layout';
import { ListingCard } from '../components/ListingCard';
import styles from '../sass/pages/Search.module.scss';
import { useSearchStore } from '../stores/useSearchStore';
import { withApollo } from '../utils/withApollo';

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
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
        <FiltersBar />

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
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Search);
