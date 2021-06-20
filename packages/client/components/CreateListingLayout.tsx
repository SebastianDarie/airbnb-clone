import { AirbnbSmallSvg } from '@airbnb-clone/controller';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../sass/pages/CreateListing.module.scss';
import { useListingNavigation } from '../shared-hooks/useListingNavigation';

interface CreateListingLayoutProps {
  disabled?: boolean;
}

export const CreateListingLayout: React.FC<CreateListingLayoutProps> = ({
  disabled,
  children,
}) => {
  const router = useRouter();
  const [placeholderText, progressBar, nextPage] = useListingNavigation(router);

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
            <h1 className={styles.placeholder__text}>{placeholderText}</h1>
          </div>
        </div>
        <div className={styles.sticky__bar}>
          <div className={styles.bar__padding}></div>
        </div>
        <div className={styles.right__side}>
          <div className={styles.right__margin}>
            <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <div className={styles.select__container}>
                <div className={styles.items__container}>{children}</div>
              </div>
            </div>
          </div>
          <div className={styles.right__nav}>
            <div>
              <div className={styles.flex__bar}>
                <div className={styles.bar__wrapper}>
                  <div
                    className={styles.progress__bar}
                    style={{
                      transform: `translateX(${progressBar}%)`,
                    }}
                  ></div>
                </div>
              </div>

              <div className={styles.btn__container}>
                <div className={styles.btn__left}>
                  <button
                    className={styles.btn__back}
                    onClick={() => router.back()}
                  >
                    Back
                  </button>
                </div>
                <div className={styles.btn__right}>
                  <button
                    className={styles.btn__next}
                    disabled={disabled}
                    onClick={nextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
