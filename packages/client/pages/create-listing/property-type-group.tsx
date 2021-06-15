import { CreateListingLayout } from '../../components/CreateListingLayout';
import styles from '../../sass/pages/CreateListing.module.scss';

interface PropertyTypeGroupProps {}

const PropertyTypeGroup: React.FC<PropertyTypeGroupProps> = ({}) => {
  return (
    <CreateListingLayout>
      <div className={styles.radiogroup}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </CreateListingLayout>
  );
};

export default PropertyTypeGroup;
