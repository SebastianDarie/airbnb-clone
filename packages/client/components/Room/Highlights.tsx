import { CleanSvg, HomeSvg, LikeSvg, MedalSvg } from '@second-gear/controller';
import styles from './Highlights.module.scss';

interface HighlightsProps {
  type: string;
}

export const Highlights: React.FC<HighlightsProps> = ({ type }) => {
  return (
    <div className={styles.highlights__padding}>
      <div className={styles.highlight__flex}>
        <div className={styles.highlight__svg__container}>
          <HomeSvg />
        </div>
        <div className={styles.highlight__description__container}>
          <div className={styles.highlight__title}>Entire Home</div>
          <div className={styles.highlight__description}>
            You'll have the {type.toLowerCase()} to yourself
          </div>
        </div>
      </div>

      <div className={styles.highlight__flex}>
        <div className={styles.highlight__svg__container}>
          <CleanSvg />
        </div>
        <div className={styles.highlight__description__container}>
          <div className={styles.highlight__title}>Enhanced Clean</div>
          <div className={styles.highlight__description}>
            This host committed to Airbnb's 5-step enhanced cleaning process.
          </div>
        </div>
      </div>

      <div className={styles.highlight__flex}>
        <div className={styles.highlight__svg__container}>
          <MedalSvg />
        </div>
        <div className={styles.highlight__description__container}>
          <div className={styles.highlight__title}>Sergiu is a SuperHost</div>
          <div className={styles.highlight__description}>
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </div>
        </div>
      </div>

      <div className={styles.highlight__flex} style={{ margin: 0 }}>
        <div className={styles.highlight__svg__container}>
          <LikeSvg />
        </div>
        <div className={styles.highlight__description__container}>
          <div className={styles.highlight__title}>Outstanding hospitality</div>
          <div className={styles.highlight__description}>
            4 recent guests complimented Sergiu for outstanding hospitality.
          </div>
        </div>
      </div>
    </div>
  );
};
