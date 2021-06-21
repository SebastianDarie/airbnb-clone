import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import { useListingStore } from '../../stores/useListingStore';
import styles from '../../sass/components/PhotoDropzone.module.scss';
import { DraggablePhoto } from '../../components/Fields/DraggablePhoto';
import { DropzoneField } from '../../components/Fields/DropzoneField';

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

const Photos: React.FC<PhotosProps> = ({}) => {
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
                            <svg
                              viewBox='0 0 32 32'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                              role='presentation'
                              focusable='false'
                              height='24px'
                              width='24px'
                              fill='currentColor'
                            >
                              <path d='m17.2869988 6.88316725.1272148.11683275 9.2928932 9.2928932-1.4142136 1.4142136-8.293-8.29289324.0001068 20.58578644h-2l-.0001068-20.58578644-8.29278642 8.29289324-1.41421356-1.4142136 9.29289318-9.2928932c.7399408-.73994076 1.915425-.77888501 2.7012124-.11683275zm10.7130012-4.88316725v2h-24v-2z'></path>
                            </svg>
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
                      src={photos[el.id - 1]}
                      addPhoto={addPhoto}
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
};

export default Photos;
