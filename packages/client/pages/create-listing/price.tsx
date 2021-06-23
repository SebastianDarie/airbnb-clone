import { MinusSvg, PlusSvg } from '@airbnb-clone/controller';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import styles from '../../sass/components/PriceControl.module.scss';
import { useListingStore } from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

interface PriceProps {}

const Price: React.FC<PriceProps> = ({}) => {
  const price = useListingStore((state) => state.price);
  const updatePrice = useListingStore((state) => state.updatePrice);

  return (
    <CreateListingLayout>
      <div className={styles.price__container}>
        <div className={styles.price__divider}>
          <div className={styles.price__control}>
            <button
              className={styles.control__btn}
              disabled={price === '$10'}
              onClick={() =>
                updatePrice('$' + (parseInt(price.substring(1)) - 5))
              }
            >
              <span className={styles.svg__container}>
                <MinusSvg />
              </span>
            </button>
            <div>
              <div className={styles.side__margin}>
                <div className={styles.label__container}>
                  <label>
                    <div>
                      <div className={styles.input__container}>
                        <input
                          autoComplete='off'
                          pattern='[0-9]*'
                          placeholder='$00'
                          type='text'
                          className={styles.input}
                          value={price}
                          onChange={(e) => updatePrice(e.currentTarget.value)}
                        />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <button
              className={styles.control__btn}
              onClick={() =>
                updatePrice('$' + (parseInt(price.substring(1)) + 5))
              }
            >
              <span className={styles.svg__container}>
                <PlusSvg />
              </span>
            </button>
          </div>
          <div className={styles.sub__text}>per night</div>
        </div>
      </div>
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Price);
