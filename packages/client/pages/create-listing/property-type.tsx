import { useEffect, useRef } from 'react';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { RadioButton } from '../../components/RadioButton';
import styles from '../../sass/pages/CreateListing.module.scss';
import { useListingStore } from '../../stores/useListingStore';

interface PropertyTypeProps {}

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

  const type = useListingStore((state) => state.type);
  const selectType = useListingStore((state) => state.selectType);

  return (
    <CreateListingLayout>
      <div className={styles.radiogroup}>
        <RadioButton
          delay='400ms'
          option='Rental unit'
          description='A rented place within a multi-unit residential building or complex.'
          selected={type === 'rental unit'}
          withImage={false}
          select={selectType}
        />
        <RadioButton
          delay='449ms'
          option='Condomium (Condo)'
          description='A place within a multi-unit building or complex owned by the residents.'
          selected={type === 'condomium (condo)'}
          withImage={false}
          select={selectType}
        />
        <RadioButton
          delay='497ms'
          option='Loft'
          description='An open layout apartment or condo, which may have short interior walls.'
          selected={type === 'loft'}
          withImage={false}
          select={selectType}
        />
        <RadioButton
          delay='543ms'
          option='Serviced apartment'
          description='An open layout apartment or condo, which may have short interior walls.'
          selected={type === 'serviced apartment'}
          withImage={false}
          select={selectType}
        />
        <RadioButton
          delay='584ms'
          option='Casa particular'
          description='A private room in a home that feels like a bed and breakfast in Cuba.'
          selected={type === 'casa particular'}
          withImage={false}
          select={selectType}
        />
      </div>
    </CreateListingLayout>
  );
};

export default PropertyType;
