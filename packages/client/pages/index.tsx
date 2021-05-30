import Link from 'next/link';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';

type IndexProps = {};

const IndexPage: React.FC<IndexProps> = () => (
  <Layout title='Vacations Rentals, Homes, Hotels, Experiences & More - Airbnb'></Layout>
);

export default withApollo({ ssr: false })(IndexPage);
