import { Photo } from "@second-gear/common";
import dynamic from "next/dynamic";
import { memo } from "react";
import { CreateListingLayout } from "../../components/CreateListingLayout";
import styles from "../../sass/components/PhotoDropzone.module.scss";
import ListingStore from "../../stores/useListingStore";
import { DraggablePhotoProps } from "../../types";
import { withApollo } from "../../utils/withApollo";

const DraggablePhoto = dynamic<DraggablePhotoProps>(() =>
  import("../../components/Fields/DraggablePhoto").then(
    (mod) => mod.DraggablePhoto
  )
);
const DropzoneField = dynamic<{
  addPhoto: (file: File, photo: Photo) => void;
}>(() =>
  import("../../components/Fields/DropzoneField").then(
    (mod) => mod.DropzoneField
  )
);
const UploadSvg = dynamic<{}>(() =>
  import("@second-gear/controller").then((mod) => mod.UploadSvg)
);

interface PhotosProps {}

const items = [
  {
    id: 1,
    cover: true,
    delay: "400ms",
  },
  {
    id: 2,
    cover: false,
    delay: "449ms",
  },
  {
    id: 3,
    cover: false,
    delay: "497ms",
  },
  {
    id: 4,
    cover: false,
    delay: "543ms",
  },
  {
    id: 5,
    cover: false,
    delay: "584ms",
  },
];

const Photos: React.FC<PhotosProps> = memo(({}) => {
  const photos = ListingStore.useListingStore((state) => state.photos);

  return (
    <CreateListingLayout disabled={photos.length !== 5}>
      {photos.length === 0 ? (
        <DropzoneField addPhoto={ListingStore.addPhoto} />
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
                <div className={styles.preview__grid}>
                  {items.map((el) => (
                    <DraggablePhoto
                      key={el.id}
                      id={`${el.id}`}
                      cover={el.cover}
                      delay={el.delay}
                      src={photos[el.id - 1]?.[1].src}
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
