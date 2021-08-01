import {
  SearchListingResult,
  PreviousSvg,
  NextSvg,
} from '@second-gear/controller';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../sass/components/ListingCard.module.scss';

interface ImageCardProps {
  listing: SearchListingResult;
}

export const ImageCard: React.FC<ImageCardProps> = ({ listing }) => {
  const [currIdx, setCurrIdx] = useState(0);

  const prevSlide = () => {
    const lastIdx = listing.photos.length - 1;
    const shouldResetIdx = currIdx === 0;
    const idx = shouldResetIdx ? lastIdx : currIdx - 1;
    setCurrIdx(idx);
  };

  const nextSlide = () => {
    const lastIdx = listing.photos.length - 1;
    const shouldResetIdx = currIdx === lastIdx;
    const idx = shouldResetIdx ? lastIdx : currIdx + 1;
    setCurrIdx(idx);
  };

  return (
    <div className={styles.card__image__border}>
      <div className={styles.card__image__padding}>
        <div className={styles.card__image__position}>
          <div className={styles.card__image__div}>
            <Image
              src={listing.photos[currIdx]}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </div>
      <div className={styles.image__controls__position}>
        <div className={styles.image__controls__div}>
          <div className={styles.prev__btn__container}>
            <button
              className={styles.prev__btn}
              onClick={prevSlide}
              style={{ display: currIdx === 0 ? 'none' : '' }}
            >
              <PreviousSvg />
            </button>
          </div>
          <div className={styles.next__btn__container}>
            <button
              className={styles.next__btn}
              onClick={nextSlide}
              style={{
                display: currIdx === listing.photos.length - 1 ? 'none' : '',
              }}
            >
              <NextSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
