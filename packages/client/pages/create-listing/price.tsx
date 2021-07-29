import { MinusSvg, PlusSvg } from '@second-gear/controller';
import { CreateListingLayout } from '../../components/CreateListingLayout';
import styles from '../../sass/components/PriceControl.module.scss';
import ListingStore from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

interface PriceProps {}

const Price: React.FC<PriceProps> = ({}) => {
  const price = ListingStore.useListingStore((state) => state.price);
  const updatePrice = ListingStore.updatePrice;

  return (
    <CreateListingLayout>
      <div className={styles.price__container}>
        <div className={styles.price__divider}>
          <div className={styles.price__control}>
            <button
              className={styles.control__btn}
              disabled={price === 10}
              onClick={() => updatePrice(price - 5)}
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
                          onChange={(e) =>
                            updatePrice(parseInt(e.currentTarget.value))
                          }
                        />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <button
              className={styles.control__btn}
              onClick={() => updatePrice(price + 5)}
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
