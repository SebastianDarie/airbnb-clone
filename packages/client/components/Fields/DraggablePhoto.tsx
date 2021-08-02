import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from '../../sass/components/PhotoDropzone.module.scss';
import ListingStore from '../../stores/useListingStore';
import { EditSvg, ImageSvg, TrashSvg } from '@second-gear/controller';
import { DraggablePhotoProps } from '../../types';

export const DraggablePhoto: React.FC<DraggablePhotoProps> = ({
  id,
  cover,
  delay,
  src,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cover ? styles.cover : styles.draggable}>
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
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                alt='preview image'
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
};
