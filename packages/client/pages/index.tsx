import Layout from '../components/Layout';
import { HomeView } from '../modules/views/HomeView';
import { withApollo } from '../utils/withApollo';

type IndexProps = {};

const IndexPage: React.FC<IndexProps> = () => (
  <Layout search>
    <HomeView />
  </Layout>
);

export default withApollo({ ssr: false })(IndexPage);
