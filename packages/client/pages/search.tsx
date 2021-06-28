import Link from 'next/link';
import shallow from 'zustand/shallow';
import { useSearchListingsQuery } from '../../controller/dist';
import Layout from '../components/Layout';
import { useSearchStore } from '../stores/useSearchStore';
import { withApollo } from '../utils/withApollo';
import styles from '../sass/pages/Search.module.scss';

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
    <Layout search={false}>
      <div className={styles.inset__div}>
        <div className={styles.options__bar}></div>
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
                    <div className={styles.listings__margin}></div>
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
