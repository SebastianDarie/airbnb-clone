import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { useListingStore } from '../../stores/useListingStore';
import styles from '../../sass/components/PhotoDropzone.module.scss';
import { DraggablePhoto } from '../../components/Fields/DraggablePhoto';
import { DropzoneField } from '../../components/Fields/DropzoneField';
import { UploadSvg } from '../../../controller/dist';
import { withApollo } from '../../utils/withApollo';

interface PhotosProps {}

const items = [
  {
    id: 1,
    cover: true,
    delay: '400ms',
  },
  {
    id: 2,
    cover: false,
    delay: '449ms',
  },
  {
    id: 3,
    cover: false,
    delay: '497ms',
  },
  {
    id: 4,
    cover: false,
    delay: '543ms',
  },
  {
    id: 5,
    cover: false,
    delay: '584ms',
  },
];

const Photos: React.FC<PhotosProps> = memo(({}) => {
  const [draggables, setDraggables] = useState<
    { id: number; cover: boolean; delay: string }[]
  >(items);
  const photos = useListingStore((state) => state.photos);
  const addPhoto = useListingStore((state) => state.addPhoto);

  const findImage = useCallback(
    (id: string) => {
      const image = draggables.filter((i) => `${i.id}` === id)[0];
      return {
        image,
        index: draggables.indexOf(image),
      };
    },
    [draggables]
  );

  const moveImage = useCallback(
    (id: string, atIndex: number) => {
      const { image, index } = findImage(id);
      setDraggables(
        update(draggables, {
          $splice: [
            [index, 1],
            [atIndex, 0, image],
          ],
        })
      );
    },
    [findImage, draggables, setDraggables]
  );

  const [, drop] = useDrop(() => ({ accept: 'preview' }));

  return (
    <CreateListingLayout disabled={photos.length !== 5}>
      {photos.length === 0 ? (
        <DropzoneField addPhoto={addPhoto} />
      ) : (
        <div className={styles.main__container}>
          <div className={styles.container__margin}>
            <div>
              <div>
                <div className={styles.preview__header}>
                  <div className={styles.preview__flexer}>
                    <div className={styles.left__padding}>
                      <h2 className={styles.add__text}>
                        Add at least 5 photos
                      </h2>
                      <div className={styles.reorder__text}>
                        Drag to reorder
                      </div>
                    </div>

                    <div>
                      <button className={styles.upload__btn}>
                        <span className={styles.align__span}>
                          <span className={styles.icon__margin}>
                            <UploadSvg />
                          </span>
                          <span>Upload</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.preview__section}>
                <div className={styles.preview__grid} ref={drop}>
                  {draggables.map((el) => (
                    <DraggablePhoto
                      key={el.id}
                      id={`${el.id}`}
                      cover={el.cover}
                      delay={el.delay}
                      src={photos[el.id - 1]?.[1].src}
                      findImage={findImage}
                      moveImage={moveImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CreateListingLayout>
  );
});

export default withApollo({ ssr: false })(Photos);
