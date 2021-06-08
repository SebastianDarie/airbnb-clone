import Layout from '../components/Layout';
import { HomeView } from '../modules/views/HomeView';
import { withApollo } from '../utils/withApollo';

type IndexProps = {};

const IndexPage: React.FC<IndexProps> = () => (
  <Layout
    search
    title='Vacations Rentals, Homes, Hotels, Experiences & More - Airbnb'
  >
    <HomeView />
  </Layout>
);

export default withApollo({ ssr: false })(IndexPage);
