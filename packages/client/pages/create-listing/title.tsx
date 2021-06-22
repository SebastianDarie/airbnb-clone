import { CreateListingLayout } from '../../components/CreateListingLayout';
import styles from '../../sass/components/TitleBox.module.scss';
import { useListingStore } from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

interface TitleProps {}

const Title: React.FC<TitleProps> = ({}) => {
  const title = useListingStore((state) => state.title);

  return (
    <CreateListingLayout disabled={title.length === 0}>
      <div className={styles.padding}>
        <div className={styles.flex}>
          <div className={styles.width}>
            <div className={styles.three__flex}>
              <h2 className={styles.box__title}>
                <label className={styles.label__title} htmlFor='title'>
                  Create your title
                </label>
              </h2>
              <div className={styles.textbox__container}>
                <textarea
                  autoComplete='off'
                  className={styles.textarea}
                  maxLength={50}
                  onChange={(e) =>
                    useListingStore.getState().addTitle(e.currentTarget.value)
                  }
                  placeholder='Your awesome title here!'
                  rows={3}
                  value={title}
                />
              </div>
              <div className={styles.count__flex}>
                <div className={styles.count__font}>
                  <span>{title.length}/50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Title);
