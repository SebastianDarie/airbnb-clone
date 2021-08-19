import dynamic from "next/dynamic";
import { CreateListingLayout } from "../../components/CreateListingLayout";
import styles from "../../sass/pages/CreateListing.module.scss";
import ListingStore from "../../stores/useListingStore";
import { RadioButtonProps } from "../../types";
import { useIsAuth } from "../../utils/useIsAuth";
import { withApollo } from "../../utils/withApollo";

const RadioButton = dynamic<RadioButtonProps>(() =>
  import("../../components/RadioButton").then((mod) => mod.RadioButton)
);

interface PropertyTypeGroupProps {}

const PropertyTypeGroup: React.FC<PropertyTypeGroupProps> = ({}) => {
  useIsAuth();
  const category = ListingStore.useListingStore((state) => state.category);

  return (
    <CreateListingLayout>
      <div className={styles.radiogroup}>
        <RadioButton
          delay="400ms"
          option="Apartment"
          selected={category === "Apartment"}
          src="https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240"
        />
        <RadioButton
          delay="449ms"
          option="House"
          selected={category === "House"}
          src="https://a0.muscache.com/im/pictures/d1af74db-58eb-46bf-b3f5-e42b6c9892db.jpg?im_w=240"
        />
        <RadioButton
          delay="497ms"
          option="Secondary Unit"
          selected={category === "Secondary Unit"}
          src="https://a0.muscache.com/im/pictures/32897901-1870-4895-8e23-f08dc0e61750.jpg?im_w=240"
        />
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(PropertyTypeGroup);
