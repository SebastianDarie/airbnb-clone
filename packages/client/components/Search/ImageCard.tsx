import { SearchListingResult } from '@airbnb-clone/controller';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../sass/components/ListingCard.module.scss';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import SwiperCore, { Navigation, Pagination } from 'swiper/core';

interface ImageCardProps {
  listing: SearchListingResult;
}

SwiperCore.use([Navigation, Pagination]);

export const ImageCard: React.FC<ImageCardProps> = ({ listing }) => {
  return (
    <div className={styles.card__image__border}>
      <div className={styles.card__image__padding}>
        <div className={styles.card__image__position}>
          <div className={styles.card__image__div}>
            <Swiper
              loop
              navigation
              observer
              observeParents
              pagination={{ clickable: true, dynamicBullets: true }}
              slidesPerView={1}
              spaceBetween={30}
            >
              {listing.photos.map((photo, i) => (
                <SwiperSlide key={i}>
                  <Image src={photo} layout='fill' objectFit='cover' />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
