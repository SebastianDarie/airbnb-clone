import shallow from 'zustand/shallow';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { NumberField } from '../../components/Fields/NumberField';
import { StepForm } from '../../interfaces';
import { useListingStore } from '../../stores/useListingStore';

const FloorPlan: React.FC<StepForm> = ({}) => {
  const [beds, guests, price] = useListingStore(
    (state) => [state.price, state.beds, state.guests],
    shallow
  );
  const updateForm = useListingStore((state) => state.updateForm);
  console.log(beds, guests, price);
  return (
    <CreateListingLayout>
      <NumberField label='Price' />
      <NumberField label='Beds' />
      <NumberField label='Guests' />
    </CreateListingLayout>
  );
};

export default FloorPlan;
