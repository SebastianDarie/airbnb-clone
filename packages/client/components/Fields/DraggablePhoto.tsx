import { memo, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Dropzone from 'react-dropzone';
import styles from '../../sass/components/PhotoDropzone.module.scss';
import ListingStore from '../../stores/useListingStore';
import { EditSvg, ImageSvg, TrashSvg } from '@airbnb-clone/controller';

interface DraggablePhotoProps {
  id: string;
  cover: boolean;
  delay: string;
  src: string;
  findImage: (id: string) => { index: number };
  moveImage: (id: string, to: number) => void;
}

interface Image {
  id: string;
  originalIndex: number;
}

export const DraggablePhoto: React.FC<DraggablePhotoProps> = memo(
  ({ id, cover, delay, src, findImage, moveImage }) => {
    const originalIndex = findImage(id).index;
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: 'preview',
        item: { id, originalIndex },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
          const { id: droppedId, originalIndex } = item;
          const didDrop = monitor.didDrop();
          if (!didDrop) {
            moveImage(droppedId, originalIndex);
          }
        },
      }),
      [id, originalIndex, moveImage]
    );

    const [, drop] = useDrop(
      () => ({
        accept: 'preview',
        canDrop: () => false,
        hover({ id: draggedId }: Image) {
          if (draggedId !== id) {
            const { index: overIndex } = findImage(id);
            moveImage(draggedId, overIndex);
          }
        },
      }),
      [findImage, moveImage]
    );

    const [hovered, setHovered] = useState(false);
    return (
      <div
        className={cover ? styles.cover : styles.draggable}
        ref={(node) => drag(drop(node))}
      >
        <div style={{ animationDelay: delay, marginBottom: 16 }}>
          {src ? (
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className={styles.cover__container}>
                <div style={{ display: 'flex' }}>
                  {cover ? (
                    <div className={styles.cover__tag}>Cover Photo</div>
                  ) : null}

                  <div
                    className={
                      hovered ? styles.img__btns__revealed : styles.img__btns
                    }
                  >
                    <div style={{ paddingLeft: 8 }}>
                      <button className={styles.control__btn}>
                        <EditSvg />
                      </button>
                    </div>
                    <div style={{ paddingLeft: 8 }}>
                      <button
                        className={styles.control__btn}
                        onClick={() => ListingStore.removePhoto(id)}
                      >
                        <TrashSvg />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.img__container}>
                <img
                  src={src}
                  style={{
                    opacity: isDragging ? 0 : 1,
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          ) : (
            <div className={styles.draggable__border}>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  const reader = new FileReader();

                  reader.onload = () => {
                    if (reader.result) {
                      ListingStore.addPhoto(acceptedFiles[0], {
                        name: acceptedFiles[0].name,
                        src: reader.result.toString(),
                        type: acceptedFiles[0].type,
                      });
                    }
                  };

                  reader.readAsDataURL(acceptedFiles[0]);
                }}
                accept='image/jpeg, image/jpg, image/png'
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <ImageSvg />
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
            </div>
          )}
        </div>
      </div>
    );
  }
);
