import { useSearchListingsQuery } from '../../controller/dist';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  //const [] = useSearchListingsQuery({variables: {input: {}, limit: 20, cursor: null}})

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
