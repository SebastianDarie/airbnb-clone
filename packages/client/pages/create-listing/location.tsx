import dynamic from 'next/dynamic';
import { withApollo } from '../../utils/withApollo';

interface LocationProps {}

const CreateListingLayout = dynamic<{ location?: boolean }>(() =>
  import('../../components/CreateListingLayout').then(
    (mod) => mod.CreateListingLayout
  )
);
const Map = dynamic(() => import('../../components/Map/LocationField'), {
  ssr: false,
});

const Location: React.FC<LocationProps> = ({}) => {
  return (
    <CreateListingLayout location>
      <Map />
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Location);
