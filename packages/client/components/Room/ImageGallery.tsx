import Image from "next/image";
import { useToggle } from "../../shared-hooks/useToggle";
import styles from "./ImageGallery.module.scss";

interface ImageGalleryProps {
  photos: Array<string>;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ photos }) => {
  const [isHovered, toggleHover] = useToggle(false);

  return (
    <div className={styles.room__images__border}>
      <div className={styles.room__images__section}>
        <div className={styles.room__images__padding}>
          <div className={styles.room__images__position}>
            <div className={styles.room__cover__position}>
              <div className={styles.room__images__container}>
                <div
                  className={styles.room__image__relative}
                  onMouseEnter={toggleHover}
                  onMouseLeave={toggleHover}
                >
                  <div className={styles.room__image__container}>
                    <Image src={photos[0]} layout="fill" objectFit="cover" />
                  </div>

                  <div
                    className={styles.room__cover__hover}
                    style={{ display: isHovered ? "block" : "none" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={styles.room__images__flex__left}>
              <div className={styles.room__images__container}>
                <div className={styles.room__image__top}>
                  <div className={styles.room__image__relative}>
                    <div className={styles.room__image__container}>
                      <Image src={photos[1]} layout="fill" objectFit="cover" />
                    </div>

                    <div
                      className={styles.room__cover__hover}
                      style={{
                        display: isHovered ? "block" : "none",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.room__image__bottom}>
                  <div className={styles.room__image__relative}>
                    <div className={styles.room__image__container}>
                      <Image src={photos[2]} layout="fill" objectFit="cover" />
                    </div>

                    <div
                      className={styles.room__cover__hover}
                      style={{
                        display: isHovered ? "block" : "none",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.room__images__flex__right}>
              <div className={styles.room__images__container}>
                <div className={styles.room__image__top}>
                  <div className={styles.room__image__relative}>
                    <div className={styles.room__image__container}>
                      <Image src={photos[3]} layout="fill" objectFit="cover" />
                    </div>

                    <div
                      className={styles.room__cover__hover}
                      style={{
                        display: isHovered ? "block" : "none",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.room__image__bottom}>
                  <div className={styles.room__image__relative}>
                    <div className={styles.room__image__container}>
                      <Image src={photos[4]} layout="fill" objectFit="cover" />
                    </div>

                    <div
                      className={styles.room__cover__hover}
                      style={{
                        display: isHovered ? "block" : "none",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
