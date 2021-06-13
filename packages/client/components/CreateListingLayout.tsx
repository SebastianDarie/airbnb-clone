import { AirbnbSmallSvg } from '@airbnb-clone/controller';
import Link from 'next/link';
import styles from '../sass/pages/CreateListing.module.scss';

interface CreateListingLayoutProps {}

export const CreateListingLayout: React.FC<CreateListingLayoutProps> = ({
  children,
}) => {
  return (
    <div>
      <div className={styles.bg__gradient}></div>
      <div className={styles.content__container}>
        <div className={styles.left__side}>
          <div className={styles.logo__container}>
            <Link href='/'>
              <a className={styles.icon__link}>
                <span>
                  <AirbnbSmallSvg fill='white' classname='' />
                </span>
              </a>
            </Link>
          </div>
          <div className={styles.placeholder__container}>
            <h1 className={styles.placeholder__text}>
              What kind of place will you host?
            </h1>
          </div>
        </div>
        <div className={styles.right__side}>
          {children}
          <div className={styles.right__nav}></div>
        </div>
      </div>
    </div>
  );
};
