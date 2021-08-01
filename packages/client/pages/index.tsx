import dynamic from 'next/dynamic';
import { useGoogleMaps } from '../utils/GoogleMapsProvider';
import { withApollo } from '../utils/withApollo';

const Layout = dynamic(() => import('../components/Layout'));
const HomeView = dynamic<{}>(() =>
  import('../modules/views/HomeView').then((mod) => mod.HomeView)
);

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
