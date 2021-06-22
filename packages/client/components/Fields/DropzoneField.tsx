import Dropzone from 'react-dropzone';
import { DropImagesSvg } from '@airbnb-clone/controller';
import styles from '../../sass/components/PhotoDropzone.module.scss';

interface DropzoneFieldProps {
  addPhoto: (photos: string) => void;
}

export const DropzoneField: React.FC<DropzoneFieldProps> = ({ addPhoto }) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onload = () => {
            if (reader.result) {
              addPhoto(reader.result.toString());
            }
          };

          reader.readAsDataURL(file);
        });
      }}
      accept='image/jpeg, image/jpg, image/png'
      maxFiles={5}
    >
      {({ getRootProps, getInputProps }) => (
        <section className={styles.dropzone}>
          <div className={styles.side__padding} {...getRootProps()}>
            <div className={styles.border__div}>
              <div className={styles.inner__margin}>
                <DropImagesSvg />
                <div className={styles.drag__text}>Drag your photos here</div>
                <p style={{ fontSize: 16 }}>Add at least 5 photos</p>
                <input {...getInputProps()} />
              </div>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
