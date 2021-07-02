import { ReviewSvg } from '@airbnb-clone/controller';
import Link from 'next/link';
import styles from './Header.module.scss';

interface HeaderProps {
  city: string;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ city, title }) => {
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
            <span className={styles.header__rating}>5.0</span>
            <Link href='/'>
              <a>
                <span className={styles.header__reviews__count}>
                  (9 reviews)
                </span>
              </a>
            </Link>
          </span>
          <span className={styles.room__header__dot}>·</span>
          <span className={styles.room__header__details}>
            <span>󰀃</span>
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
