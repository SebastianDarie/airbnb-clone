import {
  AirbnbSmallSvg,
  useCreateListingMutation,
  useSignS3Mutation,
} from '@airbnb-clone/controller';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../sass/pages/CreateListing.module.scss';
import { useGradient } from '../shared-hooks/useGradient';
import { useListingNavigation } from '../shared-hooks/useListingNavigation';
import { formatFilenames } from '../utils/formatFilenames';
import { DotLoader } from './DotLoader';

interface CreateListingLayoutProps {
  disabled?: boolean;
  final?: boolean;
  location?: boolean;
}

export const CreateListingLayout: React.FC<CreateListingLayoutProps> = ({
  disabled = false,
  final = false,
  location = false,
  children,
}) => {
  const router = useRouter();
  const [placeholderText, progressBar, nextPage] = useListingNavigation(router);
  const [coords, setCoords] = useGradient();
  const [createListing, { loading }] = useCreateListingMutation();
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
                  <AirbnbSmallSvg fill='white' />
                </span>
              </a>
            </Link>
          </div>
          <div className={styles.placeholder__container}>
            <h1 className={styles.placeholder__text}>{placeholderText}</h1>
          </div>
        </div>
        {location ? null : (
          <div className={styles.sticky__bar}>
            <div className={styles.bar__padding}></div>
          </div>
        )}
        <div className={styles.right__side}>
          <div
            className={styles.right__margin}
            style={{ padding: location ? 0 : '' }}
          >
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
                      transition: 'transform 0.6s ease 0s',
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
                      onMouseMove={(e) => setCoords(e)}
                      onClick={async () => {
                        const store = (
                          await import('../stores/useListingStore')
                        ).default;
                        const photos = store.useListingStore.getState().photos;

                        formatFilenames(photos, 'listings');

                        const pureFiles = photos.map((p) => p[0]);
                        const purePhotos = photos.map((p) => p[1]);

                        const { data } = await s3Sign({
                          variables: { photos: purePhotos },
                        });

                        await uploadToS3(pureFiles, data!.signS3);

                        const { errors } = await createListing({
                          variables: {
                            input: {
                              amenities: store.useListingStore.getState()
                                .amenities,
                              bathrooms: store.useListingStore.getState()
                                .bathrooms,
                              bedrooms: store.useListingStore.getState()
                                .bedrooms,
                              beds: store.useListingStore.getState().beds,
                              category: store.useListingStore.getState()
                                .category,
                              city: store.useListingStore.getState().city,
                              description: store.useListingStore.getState()
                                .description,
                              guests: store.useListingStore.getState().guests,
                              highlights: store.useListingStore.getState()
                                .highlights,
                              latitude: store.useListingStore.getState().coords
                                .lat,
                              longitude: store.useListingStore.getState().coords
                                .lng,
                              price: store.useListingStore.getState().price,
                              title: store.useListingStore.getState().title,
                              type: store.useListingStore.getState().type,
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
                      <span
                        className={
                          loading ? styles.inset__span : styles.absolute__span
                        }
                      >
                        <span
                          className={styles.radial__span}
                          style={{
                            backgroundPosition: `calc((100 - ${coords.x}) * 1%) calc((100 - ${coords.y}) * 1%)`,
                            display: loading ? 'none' : '',
                          }}
                        ></span>
                        {loading ? <DotLoader /> : null}
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
