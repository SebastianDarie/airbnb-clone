import { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { useMeQuery } from '@second-gear/controller';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import styles from '../../sass/components/Preview.module.scss';
import ListingStore from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

interface PreviewProps {}

const Preview: React.FC<PreviewProps> = ({}) => {
  const { data } = useMeQuery();
  const cover = ListingStore.useListingStore(
    useCallback((state) => state.photos[0], [0])
  );
  const [
    bathrooms,
    bedrooms,
    beds,
    guests,
    description,
    title,
    type,
  ] = ListingStore.useListingStore(
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
                    <img
                      src={cover[1].src ?? ''}
                      className={styles.image__preview}
                    />
                  </div>
                </div>
              </div>
              <h1 className={styles.listing__title}>{title}</h1>

              <div className={styles.typeicon__container}>
                <h2 className={styles.property__type}>
                  {type} hosted by {data?.me?.name}{' '}
                </h2>
                <div className={styles.profile__container}>
                  <img
                    src={data?.me?.photoUrl}
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

export default withApollo({ ssr: true })(Preview);
