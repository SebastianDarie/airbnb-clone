import { FiltersSvg } from '@airbnb-clone/controller';
import FiltersStore, { FilterKey } from '../stores/useFiltersStore';
import { AmenityOption } from './AmenityOption';
import styles from '../sass/components/FiltersBar.module.scss';
import shallow from 'zustand/shallow';

interface FiltersBarProps {}

const amenityFilters = [
  'Wifi',
  'Kitchen',
  'Air conditioning',
  'Washer',
  'Iron',
  'Pets allowed',
  'Dedicated workspace',
  'Free parking',
  'Dryer',
  'Pool',
  'Gym',
];

export const FiltersBar: React.FC<FiltersBarProps> = ({}) => {
  // const [air, workspace, dryer] = FiltersStore.useFiltersStore(
  //   (state) => [
  //     state.Airconditioning,
  //     state.Dedicatedworkspace,
  //     state.Dryer,
  //     state.Freeparking,
  //     state.Gym,
  //     state.Iron,
  //     state.Kitchen,
  //     state.Petsallowed,
  //   ],
  //   shallow
  // );
  const filtersArr = FiltersStore.useFiltersStore.getState();
  console.log(Object.keys(filtersArr).values());

  return (
    <div className={styles.options__bar}>
      <div className={styles.options__dimensions}>
        <div className={styles.options__padding}>
          <div className={styles.options__margin}>
            <div className={styles.options__container}>
              <div className={styles.options__flex}>
                <div>
                  <div className={styles.options__wrap}>
                    {amenityFilters.map((filter, i) => (
                      <AmenityOption
                        key={i}
                        option={filter}
                        selected={FiltersStore.useFiltersStore(
                          (state) =>
                            state[filter.replace(/\s+/g, '') as FilterKey]
                        )}
                        styles={styles}
                        setFilter={FiltersStore.setFilter}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.filters__container}>
                  <button className={styles.amenity__btn}>
                    <div className={styles.filters__flex}>
                      <div className={styles.svg__margin}>
                        <FiltersSvg />
                      </div>
                      <span className={styles.filters__text}>Filters</span>
                    </div>
                  </button>

                  <div className={styles.filters__count__container}>
                    <div className={styles.filters__count}>
                      {
                        Object.keys(filtersArr).filter(
                          (f) => filtersArr[f as FilterKey] === true
                        ).length
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
