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
import { useState } from 'react';
import { Highlight } from '../../components/Highlight';
import { useListingStore } from '../../stores/useListingStore';

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
  const [highlights, _setHighlights] = useState(items);
  const stateHighlights = useListingStore((state) => state.highlights);
  const updateHighlights = useListingStore((state) => state.updateHighlights);

  return (
    <CreateListingLayout>
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
                updateHighlights={updateHighlights}
              />
            ))}
          </div>
        </div>
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Description);
