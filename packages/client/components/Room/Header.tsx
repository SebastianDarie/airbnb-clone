import { Reviews, ReviewSvg } from '@second-gear/controller';
import Link from 'next/link';
import styles from './Header.module.scss';

interface HeaderProps {
  avg: number;
  city: string | undefined;
  reviews: Reviews;
  title: string | undefined;
}

export const Header: React.FC<HeaderProps> = ({
  avg,
  city,
  reviews,
  title,
}) => {
  return (
    <>
      <div className={styles.room__title__container}>
        <h1 className={styles.room__title__top}>{title}</h1>
      </div>

      <div className={styles.room__header__footer}>
        <div className={styles.room__header__reviews}>
          <span className={styles.room__header__details}>
            <span className={styles.header__svg}>
              <ReviewSvg />
            </span>
            <span className={styles.header__rating}>
              {avg / (reviews?.length ?? 1) || 'New'}
            </span>
            <Link href='/'>
              <a>
                <span className={styles.header__reviews__count}>
                  ({reviews?.length} reviews)
                </span>
              </a>
            </Link>
          </span>
          <span className={styles.room__header__dot}>·</span>
          <span className={styles.room__header__details}>
            <span className={styles.header__reviews__count}>Superhost</span>
          </span>
          <span className={styles.room__header__dot}>·</span>
          <span className={styles.room__header__details}>
            <span className={styles.room__header__location}>{city}</span>
          </span>
        </div>
      </div>
    </>
  );
};
