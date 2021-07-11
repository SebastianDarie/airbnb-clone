import { CreateListingLayout } from '../../components/CreateListingLayout';
import { RadioButton } from '../../components/RadioButton';
import styles from '../../sass/pages/CreateListing.module.scss';
import { useListingStore } from '../../stores/useListingStore';
import { useIsAuth } from '../../utils/useIsAuth';
import { withApollo } from '../../utils/withApollo';

interface PropertyTypeGroupProps {}

const PropertyTypeGroup: React.FC<PropertyTypeGroupProps> = ({}) => {
  useIsAuth();
  const category = useListingStore((state) => state.category);
  const selectCategory = useListingStore((state) => state.selectCategory);

  return (
    <CreateListingLayout>
      <div className={styles.radiogroup}>
        <RadioButton
          delay='400ms'
          option='Apartment'
          selected={category === 'Apartment'}
          src='https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240'
          select={selectCategory}
        />
        <RadioButton
          delay='449ms'
          option='House'
          selected={category === 'House'}
          src='https://a0.muscache.com/im/pictures/d1af74db-58eb-46bf-b3f5-e42b6c9892db.jpg?im_w=240'
          select={selectCategory}
        />
        <RadioButton
          delay='497ms'
          option='Secondary Unit'
          selected={category === 'Secondary Unit'}
          src='https://a0.muscache.com/im/pictures/32897901-1870-4895-8e23-f08dc0e61750.jpg?im_w=240'
          select={selectCategory}
        />
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(PropertyTypeGroup);
