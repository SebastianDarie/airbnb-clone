import Dropzone from 'react-dropzone';
import { useDrag, useDrop } from 'react-dnd';

import styles from '../../sass/components/PhotoDropzone.module.scss';

interface DraggablePhotoProps {
  id: string;
  cover: boolean;
  delay: string;
  src: string;
  addPhoto: (photos: string) => void;
  findImage: (id: string) => { index: number };
  moveImage: (id: string, to: number) => void;
}

interface Image {
  id: string;
  originalIndex: number;
}

export const DraggablePhoto: React.FC<DraggablePhotoProps> = ({
  id,
  cover,
  delay,
  src,
  addPhoto,
  findImage,
  moveImage,
}) => {
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
  console.log(originalIndex);
  return (
    <div
      className={cover ? styles.cover : styles.draggable}
      ref={(node) => drag(drop(node))}
    >
      <div style={{ animationDelay: delay, marginBottom: 16 }}>
        {src ? (
          <img
            // ref={(node) => drag(drop(node))}
            src={src}
            style={{
              opacity: isDragging ? 0 : 1,
              maxHeight: originalIndex === 0 && !isDragging ? '252px' : '119px',
              maxWidth: originalIndex === 0 && !isDragging ? '396px' : '190px',
              width: '100%',
            }}
          />
        ) : (
          <div className={styles.draggable__border}>
            <Dropzone
              onDrop={(acceptedFiles) => {
                const reader = new FileReader();

                reader.onload = () => {
                  if (reader.result) {
                    addPhoto(reader.result.toString());
                  }
                };

                reader.readAsDataURL(acceptedFiles[0]);
              }}
              accept='image/jpeg, image/jpg, image/png'
              maxFiles={1}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <svg
                    viewBox='0 0 32 32'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    role='presentation'
                    focusable='false'
                    height='32px'
                    width='32px'
                    fill='currentColor'
                  >
                    <path d='m27 3c2.209139 0 4 1.790861 4 4v18c0 2.209139-1.790861 4-4 4h-22c-2.209139 0-4-1.790861-4-4v-18c0-2.209139 1.790861-4 4-4zm-18.11289944 16.0381317-.09420734.0831886-5.79289322 5.7926797v.086c0 1.0543618.81587779 1.9181651 1.85073766 1.9945143l.14926234.0054857h13.085l-7.8778932-7.8786797c-.36048398-.3604839-.92771504-.3882135-1.32000624-.0831886zm12.50000004-6-.0942074.0831886-7.1288932 7.1286797 6.751 6.75h6.085c1.0543618 0 1.9181651-.8158778 1.9945143-1.8507377l.0054857-.1492623v-5.585l-6.2928932-6.2936797c-.360484-.3604839-.927715-.3882135-1.3200062-.0831886zm5.6128994-8.0381317h-22c-1.1045695 0-2 .8954305-2 2v15.084l4.37867966-4.3768932c1.12470996-1.12471 2.92027284-1.1696984 4.09865104-.1349652l.1439896.1349652 1.1276797 1.1278932 7.1296797-7.1278932c1.1247099-1.12471 2.9202728-1.1696984 4.098651-.1349652l.1439896.1349652 4.8786797 4.8778932v-9.585c0-1.0543618-.8158778-1.91816512-1.8507377-1.99451426zm-19 2c1.65685425 0 3 1.34314575 3 3 0 1.6568542-1.34314575 3-3 3s-3-1.3431458-3-3c0-1.65685425 1.34314575-3 3-3zm0 2c-.55228475 0-1 .44771525-1 1 0 .5522847.44771525 1 1 1s1-.4477153 1-1c0-.55228475-.44771525-1-1-1z'></path>
                  </svg>
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
          </div>
        )}
      </div>
    </div>
  );
};
