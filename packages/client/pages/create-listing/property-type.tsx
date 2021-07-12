import { useEffect, useRef } from 'react';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { RadioButton } from '../../components/RadioButton';
import styles from '../../sass/pages/CreateListing.module.scss';
import ListingStore from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

interface PropertyTypeProps {}

const types = [
  {
    delay: '400ms',
    option: 'Rental unit',
    description:
      'A rented place within a multi-unit residential building or complex.',
  },
  {
    delay: '449ms',
    option: 'Condomium (Condo)',
    description:
      'A place within a multi-unit building or complex owned by the residents.',
  },
  {
    delay: '497ms',
    option: 'Loft',
    description:
      'An open layout apartment or condo, which may have short interior walls.',
  },
  {
    delay: '543ms',
    option: 'Serviced apartment',
    description:
      'An apartment with hotel-like amenities serviced by a professional management company.',
  },
  {
    delay: '584ms',
    option: 'Casa particular',
    description:
      'A private room in a home that feels like a bed and breakfast in Cuba.',
  },
];

const PropertyType: React.FC<PropertyTypeProps> = ({}) => {
  // const typeRef = useRef(useListingStore.getState().type);

  // useEffect(
  //   () =>
  //     useListingStore.subscribe(
  //       (type) => (typeRef.current = type),
  //       (state) => state.type
  //     ),
  //   []
  // );

  const type = ListingStore.useListingStore((state) => state.type);
  const selectType = ListingStore.selectType;

  return (
    <CreateListingLayout>
      <div className={styles.radiogroup}>
        {types.map((t) => (
          <RadioButton
            delay={t.delay}
            option={t.option}
            description={t.description}
            selected={type === t.option}
            withImage={false}
            select={selectType}
          />
        ))}
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(PropertyType);
