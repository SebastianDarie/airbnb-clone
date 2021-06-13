import {
  CreateListingController,
  ListingFormProps,
  UpdateListingController,
} from '@airbnb-clone/controller';
import React, { useRef, useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { AmenitiesPage } from './AmenitiesPage';
import { NumberPage } from './NumberPage';
import { TextPage } from './TextPage';
import styles from '../../sass/layout/Form.module.scss';

interface ComponentListingFormProps {
  update: boolean;
}

export const ListingFormView: React.FC<ComponentListingFormProps> = ({
  update,
}) => {
  const preview = useRef<HTMLImageElement>(null);

  const [currImg, setCurrImg] = useState('');
  const [currPage, setCurrPage] = useState(2);

  const nextPage = () => {
    setCurrPage(currPage + 1);
  };

  const prevPage = () => {
    setCurrPage(currPage - 1);
  };

  let CustomController = CreateListingController;
  if (update) {
    CustomController = UpdateListingController as any;
  }

  return (
    <CustomController>
      {({ loading, submit }) => (
        <div className={styles.center}>
          <h1>New Listing</h1>

          <TextPage
            currPage={currPage}
            className={styles.submit}
            nextPage={nextPage}
          />
          <NumberPage
            currPage={currPage}
            className={styles.submit}
            nextPage={nextPage}
            prevPage={prevPage}
          />
          <AmenitiesPage
            currPage={currPage}
            className={styles.submit}
            prevPage={prevPage}
          />

          {/* <Dropzone
                disabled={!isDirty || !isValid}
                maxFiles={1}
                onDrop={(files: File[], rejections: FileRejection[]) => {
                  console.log(files[0], rejections);
                  const reader = new FileReader();

                  reader.onload = (e) => {
                    if (preview.current && e.target?.result) {
                      preview.current.src = e.target.result.toString();
                    }
                  };

                  reader.readAsDataURL(files[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone> */}

          {/* <img ref={preview} src={preview?.current?.src} /> */}
        </div>
      )}
    </CustomController>
  );
};
