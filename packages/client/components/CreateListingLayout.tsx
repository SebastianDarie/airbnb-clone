import {
  AirbnbSmallSvg,
  useCreateListingMutation,
  useSignS3Mutation,
} from '@airbnb-clone/controller';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Photo } from '@airbnb-clone/common';
import styles from '../sass/pages/CreateListing.module.scss';
import { useListingNavigation } from '../shared-hooks/useListingNavigation';
import { formatFilenames } from '../utils/formatFilenames';

interface CreateListingLayoutProps {
  disabled?: boolean;
  final?: boolean;
}

export const CreateListingLayout: React.FC<CreateListingLayoutProps> = ({
  disabled = false,
  final = false,
  children,
}) => {
  const router = useRouter();
  const [placeholderText, progressBar, nextPage] = useListingNavigation(router);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [createListing] = useCreateListingMutation();
  const [s3Sign] = useSignS3Mutation();

  const uploadToS3 = async (files: File[], signedRequests: string[]) => {
    files.map(async (f, i) => {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': `${f.type}`,
        },
        body: f,
      };

      await fetch(signedRequests[i], options);
    });
  };

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
                  {final ? (
                    <button
                      className={styles.btn__save}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        setCoords({ x, y });
                      }}
                      onClick={async () => {
                        const store = (
                          await import('../stores/useListingStore')
                        ).useListingStore;
                        const photos = store.getState().photos;

                        formatFilenames(photos, 'listings');

                        const pureFiles = photos.map((p) => p[0]);
                        const purePhotos = photos.map((p) => p[1]);

                        const { data } = await s3Sign({
                          variables: { photos: purePhotos },
                        });
                        console.log(data?.signS3);

                        await uploadToS3(pureFiles, data!.signS3);

                        const { errors } = await createListing({
                          variables: {
                            input: {
                              amenities: store.getState().amenities,
                              bathrooms: store.getState().bathrooms,
                              bedrooms: store.getState().bedrooms,
                              beds: store.getState().beds,
                              category: store.getState().category,
                              description: store.getState().description,
                              guests: store.getState().guests,
                              highlights: store.getState().highlights,
                              latitude: store.getState().latitude,
                              longitude: store.getState().longitude,
                              price: store.getState().price,
                              title: store.getState().title,
                              type: store.getState().type,
                              photos: data!.signS3.slice(
                                5,
                                data?.signS3.length
                              ),
                            },
                          },
                        });

                        if (!errors) {
                          router.push('/');
                        }
                      }}
                    >
                      <span className={styles.absolute__span}>
                        <span
                          className={styles.radial__span}
                          style={{
                            backgroundPosition: `calc((100 - ${coords.x}) * 1%) calc((100 - ${coords.y}) * 1%)`,
                          }}
                        ></span>
                      </span>
                      <span className={styles.text__span}>
                        Save your listing
                      </span>
                    </button>
                  ) : (
                    <button
                      className={styles.btn__next}
                      disabled={disabled}
                      onClick={nextPage}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
