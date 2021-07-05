interface RoomSkeletonProps {
  styles: {
    readonly [key: string]: string;
  };
  Wrapper: React.FC<{}>;
}

export const RoomSkeleton: React.FC<RoomSkeletonProps> = ({
  styles,
  Wrapper,
}) => {
  return (
    <div className={styles.display__div}>
      <div>
        <Wrapper>
          <div className={styles.title__skeleton__container}>
            <span className={styles.full__skeleton}></span>
          </div>
          <div className={styles.reviews__skeleton__container}>
            <span className={styles.full__skeleton}></span>
          </div>
        </Wrapper>

        <Wrapper>
          <div className={styles.display__div}>
            <div className={styles.images__skeleton__border}></div>
          </div>
        </Wrapper>
      </div>

      <div className={styles.room__description__section}>
        <div className={styles.description__side}>
          <div className={styles.room__section__flex}>
            <div className={styles.description__skeleton__top}>
              <div className={styles.description__skeleton__align}>
                <div>
                  <div className={styles.property__type__skeleton}>
                    <span className={styles.full__skeleton}></span>
                  </div>
                  <div className={styles.floor__plan__skeleton}>
                    <span className={styles.full__skeleton}></span>
                  </div>
                </div>

                <div className={styles.profile__img__skeleton}>
                  <span className={styles.full__skeleton}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.booking__side}>
          <div className={styles.sticky__menu}>
            <div className={styles.room__section__flex}>
              <div className={styles.price__skeleton__container}>
                <span className={styles.full__skeleton}></span>
              </div>
              <div className={styles.menu__details__skeleton}>
                <span className={styles.full__skeleton}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
