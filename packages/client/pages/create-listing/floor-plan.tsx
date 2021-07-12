import shallow from 'zustand/shallow';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { NumberField } from '../../components/Fields/NumberField';
import ListingStore from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

const FloorPlan: React.FC<{}> = ({}) => {
  const [beds, guests, bathrooms, bedrooms] = ListingStore.useListingStore(
    (state) => [state.beds, state.guests, state.bathrooms, state.bedrooms],
    shallow
  );
  const updateFloor = ListingStore.updateFloor;

  return (
    <CreateListingLayout>
      <NumberField label='Guests' value={guests} updateFloor={updateFloor} />
      <NumberField label='Beds' value={beds} updateFloor={updateFloor} />
      <NumberField
        label='Bathrooms'
        value={bathrooms}
        updateFloor={updateFloor}
      />
      <NumberField
        label='Bedrooms'
        value={bedrooms}
        updateFloor={updateFloor}
      />
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(FloorPlan);
