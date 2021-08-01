import dynamic from 'next/dynamic';
import shallow from 'zustand/shallow';
import ListingStore from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

const CreateListingLayout = dynamic<{}>(() =>
  import('../../components/CreateListingLayout').then(
    (mod) => mod.CreateListingLayout
  )
);
const NumberField = dynamic<{
  label: string;
  value: number;
  updateFloor: (type: string, value: number) => void;
}>(() =>
  import('../../components/Fields/NumberField').then((mod) => mod.NumberField)
);

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
