import shallow from 'zustand/shallow';
import { useSearchListingsQuery } from '../../controller/dist';
import Layout from '../components/Layout';
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

  console.log(latitude, longitude);
  console.log(data, error, loading);

  return (
    <Layout search={false}>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Search);
