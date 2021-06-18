import { CreateListingLayout } from '../../components/CreateListingLayout';
import { LocationField } from '../../components/Fields/LocationField';

interface LocationProps {}

const Location: React.FC<LocationProps> = ({}) => {
  return (
    <CreateListingLayout>
      <LocationField />
    </CreateListingLayout>
  );
};

export default Location;
