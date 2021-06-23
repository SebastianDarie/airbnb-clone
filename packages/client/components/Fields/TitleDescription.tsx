import styles from '../../sass/components/TitleBox.module.scss';

interface TitleDescriptionProps {
  description?: string;
  title?: string;
}

export const TitleDescription: React.FC<TitleDescriptionProps> = ({
  description = undefined,
  title = undefined,
}) => {
  return (
    <div className={styles.padding}>
      <div className={styles.flex}>
        <div className={styles.width}>
          <div className={styles.three__flex}>
            <h2 className={styles.box__title}>
              <label className={styles.label__title} htmlFor='title'>
                Create your {title !== undefined ? 'title' : 'description'}
              </label>
            </h2>
            <div className={styles.textbox__container}>
              <textarea
                autoComplete='off'
                className={`
                  ${styles.textarea}
                  ${
                    title !== undefined
                      ? styles.textarea__title
                      : styles.textarea__des
                  }`}
                maxLength={title !== undefined ? 50 : 500}
                onChange={async (e) => {
                  const { value } = e.currentTarget;

                  const useListingStore = (
                    await import('../../stores/useListingStore')
                  ).useListingStore;
                  if (title !== undefined) {
                    useListingStore.getState().addTitle(value);
                  } else if (description !== undefined) {
                    useListingStore.getState().addDescription(value);
                  }
                }}
                placeholder={
                  title !== undefined
                    ? 'Your awesome title here!'
                    : 'Intuitive Description'
                }
                rows={title !== undefined ? 3 : 4}
                value={title !== undefined ? title : description}
              />
            </div>
            <div className={styles.count__flex}>
              <div className={styles.count__font}>
                <span>
                  {title !== undefined ? title.length : description?.length}/
                  {title !== undefined ? 50 : 500}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
