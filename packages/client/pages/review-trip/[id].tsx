import { ReviewSvg } from '@airbnb-clone/controller';
import { withApollo } from '../../utils/withApollo';
import styles from '../../sass/pages/ReviewTrip.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import Layout from '../../components/Layout';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ReviewTripProps {}

type ReviewForm = {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
};

const categories = [
  'Cleanliness',
  'Accuracy',
  'Check-in',
  'Communication',
  'Location',
  'Value',
];

const ReviewTrip: React.FC<ReviewTripProps> = ({}) => {
  const { register, handleSubmit } = useForm<ReviewForm>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Layout filter room search={false}>
      <form onSubmit={onSubmit}>
        <div className={styles.main__wrapper}>
          <div className={roomStyles.amenity__item__container}>
            {categories.map((c, i, { length }) => (
              <div key={c} className={styles.category__wrapper}>
                <div className={styles.star__category}>{c}</div>
                <div className={styles.star__wrapper}>
                  <input
                    id={`${c + 1}`}
                    className={styles.star__input}
                    type='radio'
                    {...register('cleanliness')}
                  />
                  <label
                    htmlFor={`${c + 1}`}
                    className={`${styles.star__label} ${styles.s1}`}
                  >
                    <ReviewSvg className={styles.star} />
                  </label>
                  <input
                    id={`${c + 2}`}
                    className={styles.star__input}
                    type='radio'
                    {...register('cleanliness')}
                  />
                  <label
                    htmlFor={`${c + 2}`}
                    className={`${styles.star__label} ${styles.s2}`}
                  >
                    <ReviewSvg className={styles.star} />
                  </label>
                  <input
                    id={`${c + 3}`}
                    className={styles.star__input}
                    type='radio'
                    {...register('cleanliness')}
                  />
                  <label
                    htmlFor={`${c + 3}`}
                    className={`${styles.star__label} ${styles.s3}`}
                  >
                    <ReviewSvg className={styles.star} />
                  </label>
                  <input
                    id={`${c + 4}`}
                    className={styles.star__input}
                    type='radio'
                    {...register('cleanliness')}
                  />
                  <label
                    htmlFor={`${c + 4}`}
                    className={`${styles.star__label} ${styles.s4}`}
                  >
                    <ReviewSvg className={styles.star} />
                  </label>
                  <input
                    id={`${c + 5}`}
                    className={styles.star__input}
                    type='radio'
                    {...register('cleanliness')}
                  />
                  <label
                    htmlFor={`${c + 5}`}
                    className={`${styles.star__label} ${styles.s5}`}
                  >
                    <ReviewSvg className={styles.star} />
                  </label>
                </div>
                {length - 1 !== i ? (
                  <div className={roomStyles.section__divider}></div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ReviewTrip);
