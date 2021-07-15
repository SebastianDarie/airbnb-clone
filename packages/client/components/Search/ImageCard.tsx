import { ListingResult, NextSvg, PreviousSvg } from '@airbnb-clone/controller';
import Image from 'next/image';
import Link from 'next/link';

interface ImageCardProps {
  listing: ListingResult;
  showControls: boolean;
  styles: {
    readonly [key: string]: string;
  };
}

export const ImageCard: React.FC<ImageCardProps> = ({
  listing,
  showControls,
  styles,
}) => {
  return (
    <div className={styles.card__image__border}>
      <div className={styles.card__image__padding}>
        <div className={styles.card__image__position}>
          <div>
            <Link href={`/rooms/${listing.id}`}>
              <a className={styles.card__image__link}></a>
            </Link>

            <div className={styles.card__image__div}>
              <div>
                <picture>
                  <source srcSet='' media='(max-width: 743px)' />
                  <Image
                    src={listing.photos[0]}
                    layout='fill'
                    objectFit='cover'
                  />
                </picture>
              </div>
            </div>
          </div>

          <div className={styles.image__dots__container}>
            <div className={styles.image__dots}>
              <div className={styles.image__dots__overflow}>
                <div className={styles.image__dots__transform}>
                  {listing.photos.map((_photo, i) => (
                    <span
                      key={i}
                      className={styles.image__dots__dot}
                      id={i === 0 ? styles.selected__dot : undefined}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          showControls
            ? styles.image__controls__hover
            : styles.image__controls__container
        }
      >
        <div className={styles.image__controls__position}>
          <div
            className={
              showControls
                ? styles.previous__btn__hover
                : styles.previous__btn__container
            }
          >
            <button
              className={styles.navigation__btn}
              onClick={() => console.log('previous')}
            >
              <PreviousSvg />
            </button>
          </div>
          <div
            className={
              showControls
                ? styles.next__btn__hover
                : styles.next__btn__container
            }
          >
            <button
              className={styles.navigation__btn}
              onClick={() => console.log('next')}
            >
              <NextSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
