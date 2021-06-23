import { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { useMeQuery } from '@airbnb-clone/controller';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import styles from '../../sass/components/Preview.module.scss';
import { useListingStore } from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

interface PreviewProps {}

const Preview: React.FC<PreviewProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const cover = useListingStore(useCallback((state) => state.photos[0], [0]));
  const [
    bathrooms,
    bedrooms,
    beds,
    guests,
    description,
    title,
    type,
  ] = useListingStore(
    (state) => [
      state.bathrooms,
      state.bedrooms,
      state.beds,
      state.guests,
      state.description,
      state.title,
      state.type,
    ],
    shallow
  );

  return (
    <CreateListingLayout final>
      <div className={styles.preview__margin}>
        <div className={styles.media__flex}>
          <div className={styles.preview__box}>
            <div className={styles.preview__mobile}>
              <div className={styles.image__border}>
                <div className={styles.image__padding}>
                  <div className={styles.image__flex}>
                    <img src={cover} className={styles.image__preview} />
                  </div>
                </div>
              </div>
              <h1 className={styles.listing__title}>{title}</h1>

              <div className={styles.typeicon__container}>
                <h2 className={styles.property__type}>
                  {type} hosted by {data?.me?.email}{' '}
                </h2>
                <div className={styles.profile__container}>
                  <img
                    src='https://a0.muscache.com/defaults/user_pic-68x68.png?v=3'
                    className={styles.profile__img}
                  />
                </div>
              </div>

              <div className={styles.floor__plan}>
                <div>
                  {guests} guests
                  <span> · </span>
                  {bedrooms} bedrooms
                  <span> · </span>
                  {beds} beds
                  <span> · </span>
                  {bathrooms} baths
                </div>
              </div>

              <div className={styles.description__container}>{description}</div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Preview);
