import { CreateListingLayout } from '../../components/CreateListingLayout';
import { LocationField } from '../../components/Fields/LocationField';
import { withApollo } from '../../utils/withApollo';

interface LocationProps {}

const Location: React.FC<LocationProps> = ({}) => {
  return (
    <CreateListingLayout>
      <LocationField />
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Location);
