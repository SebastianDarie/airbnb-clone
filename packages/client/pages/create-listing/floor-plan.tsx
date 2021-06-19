import shallow from 'zustand/shallow';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { NumberField } from '../../components/Fields/NumberField';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';

const FloorPlan: React.FC<StepForm> = ({}) => {
  const [price, beds, guests, bathrooms, bedrooms] = useListingStore(
    (state) => [
      state.price,
      state.beds,
      state.guests,
      state.bathrooms,
      state.bedrooms,
    ],
    shallow
  );
  const updateFloor = useListingStore((state) => state.updateFloor);

  return (
    <CreateListingLayout>
      {/* <NumberField label='Price' value={price} updateFloor={updateFloor} /> */}
      <NumberField label='Guests' value={guests} updateFloor={updateFloor} />
      <NumberField label='Beds' value={beds} updateFloor={updateFloor} />
      <NumberField
        label='Bedrooms'
        value={bathrooms}
        updateFloor={updateFloor}
      />
      <NumberField
        label='Bathrooms'
        value={bedrooms}
        updateFloor={updateFloor}
      />
    </CreateListingLayout>
  );
};

export default FloorPlan;
