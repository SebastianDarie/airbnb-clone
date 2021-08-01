import { useState } from 'react';
import {
  ControllerProps,
  CreateReviewMutation,
  ReviewInput,
  ReviewSvg,
} from '@second-gear/controller';
import { withApollo } from '../../utils/withApollo';
import styles from '../../sass/pages/ReviewTrip.module.scss';
import headerStyles from '../../sass/pages/Header.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import { useRouter } from 'next/router';
import { DotLoader } from '../../components/DotLoader';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../../components/Layout'));
const CreateReviewController = dynamic<
  ControllerProps<CreateReviewMutation, ReviewInput>
>(() =>
  import('@second-gear/controller').then((mod) => mod.CreateReviewController)
);

interface ReviewTripProps {}

const narrowArray = <K extends string>(...arr: K[]) => arr;

const categories: typeof types = [
  'How was your stay?',
  'Cleanliness',
  'Accuracy',
  'Check-in',
  'Communication',
  'Location',
  'Value',
];

const types = narrowArray(
  'How was your stay?',
  'Cleanliness',
  'Accuracy',
  'Check-in',
  'Communication',
  'Location',
  'Value'
);

interface StarValues {
  id: typeof types[number];
}

const StarRating = ({
  c,
  value,
  onChange,
}: {
  c: string;
  value: number;
  onChange: (id: string, value: number) => void;
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.star__wrapper}>
      {[...Array(5)].map((_s, i) => {
        const ratingValue = i + 1;
        const id = c + ratingValue;
        return (
          <label
            key={`star_${ratingValue}`}
            className={styles.star__label}
            htmlFor={id}
          >
            <input
              id={id}
              name={c}
              className={styles.star__input}
              type='radio'
              value={value}
              onClick={() => setRating(ratingValue)}
              onChange={() => onChange(c, ratingValue)}
            />
            <ReviewSvg
              className={
                ratingValue <= (hover || rating)
                  ? styles.star__selected
                  : styles.star
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

const ReviewTrip: React.FC<ReviewTripProps> = ({}) => {
  const router = useRouter();
  const [review, setReview] = useState('');
  const [starValues, setStarValues] = useState<
    { [id in StarValues['id']]: number }
  >({
    'How was your stay?': 0,
    Cleanliness: 0,
    Accuracy: 0,
    'Check-in': 0,
    Communication: 0,
    Location: 0,
    Value: 0,
  });
  const handleChange = (id: string, value: number): void => {
    setStarValues({ ...starValues, [id]: value });
  };

  return (
    <Layout filter room search={false}>
      <CreateReviewController>
        {({ loading, submit }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              submit({
                accuracy: starValues['Accuracy'],
                checkIn: starValues['Check-in'],
                cleanliness: starValues['Cleanliness'],
                communication: starValues['Communication'],
                location: starValues['Location'],
                value: starValues['Value'],
                listingId: router.query.id as string,
                rating: starValues['How was your stay?'],
                review,
              });
            }}
          >
            <div className={styles.main__wrapper}>
              <div className={roomStyles.amenity__item__container}>
                {categories.map((c) => (
                  <div key={c} className={styles.category__wrapper}>
                    <div className={styles.star__category}>{c}</div>
                    <StarRating
                      key={c}
                      c={c}
                      value={starValues[c]}
                      onChange={handleChange}
                    />

                    <div className={roomStyles.section__divider}></div>
                  </div>
                ))}

                <div className={roomStyles.room__section__flex}>
                  <div className={roomStyles.amenities__heading__padding}></div>

                  <div className={headerStyles.reservation__header__table}>
                    <div className={headerStyles.header__cell}>
                      <div className={headerStyles.header__firstname}>
                        Write a public review
                      </div>
                      <div className={headerStyles.header__summary}>
                        Tell the next guests what you loved and anything else
                        they should know about this place.
                      </div>
                      <div
                        className={roomStyles.amenities__heading__padding}
                      ></div>
                      <div className={roomStyles.section__divider}></div>
                    </div>
                  </div>
                  <div className={roomStyles.amenities__heading__padding}></div>
                  <textarea
                    className={styles.textarea}
                    autoComplete='off'
                    placeholder='Write a public review'
                    rows={4}
                    onChange={(e) => setReview(e.currentTarget.value)}
                    onKeyDown={async (e) =>
                      (
                        await import('../../utils/autosizeTextarea').then(
                          (mod) => mod.autosizeTextarea
                        )
                      )(e)
                    }
                    value={review}
                  ></textarea>
                  <div className={roomStyles.amenities__heading__padding}></div>
                </div>

                <div className={roomStyles.room__section__flex}>
                  <button
                    className={styles.submit__btn}
                    disabled={
                      !Object.values(starValues).every((v) => v !== 0) ||
                      review === ''
                    }
                    type='submit'
                  >
                    {loading ? <DotLoader /> : 'Submit'}
                  </button>
                  <div className={roomStyles.amenities__heading__padding}></div>
                </div>
              </div>
            </div>
          </form>
        )}
      </CreateReviewController>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ReviewTrip);
