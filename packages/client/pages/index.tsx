import Layout from '../components/Layout';
import { HomeView } from '../modules/views/HomeView';
import { useGoogleMaps } from '../utils/GoogleMapsProvider';
import { withApollo } from '../utils/withApollo';

type IndexProps = {};

const IndexPage: React.FC<IndexProps> = () => {
  const { isLoaded } = useGoogleMaps();
  return (
    <Layout isLoaded={isLoaded} search>
      <HomeView />
    </Layout>
  );
};

export default withApollo({ ssr: false })(IndexPage);
