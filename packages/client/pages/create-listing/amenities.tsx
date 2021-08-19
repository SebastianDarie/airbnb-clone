import { CreateListingLayout } from "../../components/CreateListingLayout";
import {
  guestFavorites,
  safetyItems,
  standoutAmenities,
} from "../../constants/amenityList";
import styles from "../../sass/pages/Amenities.module.scss";
import ListingStore from "../../stores/useListingStore";
import { withApollo } from "../../utils/withApollo";

const Amenities: React.FC<{}> = ({}) => {
  const amenities = ListingStore.useListingStore((state) => state.amenities);
  const updateAmenities = ListingStore.updateAmenities;

  return (
    <CreateListingLayout>
      <div className={styles.amenities__container}>
        <div className={styles.amenities__section}>
          <h2 className={styles.amenities__title}>
            Do you have any standout amenitites?
          </h2>
          <div className={styles.amenities__grid}>
            {standoutAmenities.map((amenity, i) => (
              <button
                key={i}
                className={
                  amenities.includes(amenity.title)
                    ? styles.amenities__btn__checked
                    : styles.amenities__btn
                }
                onClick={() => updateAmenities(amenity.title)}
                style={{ animationDelay: `calc(${i} * 40ms + 400ms)` }}
              >
                <div className={styles.svg__container}>
                  <object
                    data={amenity.path}
                    height={52}
                    width={52}
                    style={{ pointerEvents: "none" }}
                  />
                </div>
                <div className={styles.svg__text}>{amenity.title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.amenities__section}>
          <h2 className={styles.amenities__title}>
            What about these guest favorites?
          </h2>
          <div className={styles.amenities__grid}>
            {guestFavorites.map((favorite, i) => (
              <button
                key={i}
                className={
                  amenities.includes(favorite.title)
                    ? styles.amenities__btn__checked
                    : styles.amenities__btn
                }
                onClick={() => updateAmenities(favorite.title)}
                style={{ animationDelay: `calc(${i} * 40ms + 400ms)` }}
              >
                <div className={styles.svg__container}>
                  <object
                    data={favorite.path}
                    height={52}
                    width={52}
                    style={{ pointerEvents: "none" }}
                  />
                </div>
                <div className={styles.svg__text}>{favorite.title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.amenities__section}>
          <h2 className={styles.amenities__title}>
            Have any of these safety items?
          </h2>
          <div className={styles.amenities__grid}>
            {safetyItems.map((item, i) => (
              <button
                key={i}
                className={
                  amenities.includes(item.title)
                    ? styles.amenities__btn__checked
                    : styles.amenities__btn
                }
                onClick={() => updateAmenities(item.title)}
                style={{ animationDelay: `calc(${i} * 40ms + 400ms)` }}
              >
                <div className={styles.svg__container}>
                  <object
                    data={item.path}
                    height={52}
                    width={52}
                    style={{ pointerEvents: "none" }}
                  />
                </div>
                <div className={styles.svg__text}>{item.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Amenities);
