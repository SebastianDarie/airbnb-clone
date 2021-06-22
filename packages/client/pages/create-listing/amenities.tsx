import { CreateListingLayout } from '../../components/CreateListingLayout';
import {
  guestFavorites,
  safetyItems,
  standoutAmenities,
} from '../../constants/amenityList';
import styles from '../../sass/pages/Amenities.module.scss';
import { useListingStore } from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

const Amenities: React.FC<{}> = ({}) => {
  // const poolSvg = useRef<HTMLObjectElement | null>(null);
  const amenities = useListingStore((state) => state.amenities);
  const updateAmenities = useListingStore((state) => state.updateAmenities);
  //console.log(amenities, amenities.includes('pool'));
  // const pooldefs =
  //   poolSvg.current?.contentDocument?.childNodes[0].childNodes[3];
  // console.log(pooldefs);
  // if (pooldefs) {
  //   for (let i = 0; i < pooldefs?.childNodes?.length; i++) {
  //     let animate = pooldefs.childNodes[i];
  //     animate.addEventListener('onClick', () => animate.beginElement());
  //     console.log(pooldefs.childNodes[i]);
  //   }
  // }
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
                  {/* <Image src={amenity.path} height={52} width={52} /> */}
                  <object
                    data={amenity.path}
                    height={52}
                    width={52}
                    style={{ pointerEvents: 'none' }}
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
                  {/* <Image src={favorite.path} height={52} width={52} /> */}
                  <object
                    data={favorite.path}
                    height={52}
                    width={52}
                    style={{ pointerEvents: 'none' }}
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
                  {/* <Image src={item.path} height={52} width={52} /> */}
                  <object
                    data={item.path}
                    height={52}
                    width={52}
                    style={{ pointerEvents: 'none' }}
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
