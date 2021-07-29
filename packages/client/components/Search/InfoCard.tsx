import { ReviewSvg, SearchListingsQuery } from '@second-gear/controller';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
import { InfoWindow } from '@react-google-maps/api';
import { SetStateAction } from 'react';
import { ImageCard } from './ImageCard';

interface InfoCardProps {
  data: SearchListingsQuery | undefined;
  selected: MarkerWithLabel;
  styles: {
    readonly [key: string]: string;
  };
  setSelected: (value: SetStateAction<MarkerWithLabel | null>) => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  data,
  selected,
  styles,
  setSelected,
}) => {
  const listing = data?.searchListings.listings.find(
    (l) => l.id === selected.get('id')
  );

  return (
    <InfoWindow
      position={{
        lat: selected.getPosition()!.lat(),
        lng: selected.getPosition()!.lng(),
      }}
      onCloseClick={() => setSelected(null)}
    >
      <div className={styles.info__window__card}>
        <ImageCard listing={listing!} />
        <div className={styles.info__window__content__padding}>
          <div className={styles.info__window__content__rating}>
            <span className={styles.reviews__flex}>
              <span className={styles.review__star}>
                <ReviewSvg />
              </span>
              <span className={styles.review__avg}>5.0</span>
              <span className={styles.review__count}>&nbsp;(9)</span>
            </span>
          </div>

          <div className={styles.info__window__content__location}>
            <ol className={styles.info__window__list}>
              <li>Entire {listing?.category}</li>
              <li>
                <span className={styles.info__window__dot}> · </span>{' '}
                {listing?.city}
              </li>
            </ol>
          </div>

          <div className={styles.info__window__content__description}>
            <span className={styles.info__window__description}>
              {listing?.description}
            </span>
          </div>

          <div className={styles.info__window__content__price}>
            <div
              className={styles.price__align}
              style={{ alignItems: 'flex-start' }}
            >
              <div className={styles.price__flex}>
                <span className={styles.price__value}>${listing?.price}</span>
                <span className={styles.price__night}>/ night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InfoWindow>
  );
};
