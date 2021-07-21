import styles from '../sass/layout/DotLoader.module.scss';

interface DotLoaderProps {}

export const DotLoader: React.FC<DotLoaderProps> = ({}) => {
  return (
    <span className={styles.dot__loader}>
      <span className={styles.dot} style={{ animationDelay: '-0.3s' }}></span>
      <span className={styles.dot} style={{ animationDelay: '-0.15s' }}></span>
      <span className={styles.dot}></span>
    </span>
  );
};
