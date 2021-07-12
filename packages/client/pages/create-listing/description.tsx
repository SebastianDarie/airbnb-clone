import { CreateListingLayout } from '../../components/CreateListingLayout';
import { withApollo } from '../../utils/withApollo';
import styles from '../../sass/pages/Description.module.scss';
import {
  HorseSvg,
  HouseSvg,
  LightHouseSvg,
  LocationSvg,
  PeopleSvg,
  SlippersSvg,
} from '@airbnb-clone/controller';
import { useEffect, useState } from 'react';
import { Highlight } from '../../components/Highlight';
import ListingStore from '../../stores/useListingStore';
import { useRouter } from 'next/router';
import { TitleDescription } from '../../components/Fields/TitleDescription';
import { descriptionsList } from '../../constants/descriptionsList';

interface DescriptionProps {}

const items = [
  {
    id: 1,
    delay: '449ms',
    svg: <SlippersSvg />,
    text: 'Peaceful',
  },
  {
    id: 2,
    delay: '497ms',
    svg: <LightHouseSvg />,
    text: 'Unique',
  },
  {
    id: 3,
    delay: '543ms',
    svg: <HorseSvg />,
    text: 'Family-friendly',
  },
  {
    id: 4,
    delay: '584ms',
    svg: <HouseSvg />,
    text: 'Stylish',
  },
  {
    id: 5,
    delay: '621ms',
    svg: <LocationSvg />,
    text: 'Central',
  },
  {
    id: 6,
    delay: '654ms',
    svg: <PeopleSvg />,
    text: 'Spacious',
  },
];

const Description: React.FC<DescriptionProps> = ({}) => {
  const router = useRouter();
  const [highlights] = useState(items);
  const stateHighlights = ListingStore.useListingStore(
    (state) => state.highlights
  );
  const description = ListingStore.useListingStore(
    (state) => state.description
  );

  useEffect(() => {
    if (stateHighlights.length === 2) {
      ListingStore.addDescription(
        descriptionsList.find((el) => {
          return el.combo.every((item) => stateHighlights.includes(item));
        })!.content
      );
    }
  }, [stateHighlights]);

  return (
    <CreateListingLayout>
      {router.query.highlights ? (
        <div className={styles.padding__container}>
          <div>
            <div className={styles.header__container}>
              <h2 className={styles.description}>Choose up to 2 highlights</h2>
            </div>

            <div className={styles.highlights__grid}>
              {highlights.map((h) => (
                <Highlight
                  key={h.id}
                  delay={h.delay}
                  styles={styles}
                  svg={h.svg}
                  text={h.text}
                  highlights={stateHighlights}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <TitleDescription description={description} />
      )}
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Description);
