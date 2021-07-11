import create from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {
  Wifi: false,
  Kitchen: false,
  Airconditioning: false,
  Washer: false,
  Iron: false,
  Petsallowed: false,
  Dedicatedworkspace: false,
  Freeparking: false,
  Dryer: false,
  Pool: false,
  Gym: false,
};

export type FilterKey = keyof typeof initialState;

namespace FiltersStore {
  export const useFiltersStore = create(devtools(() => initialState));

  export const setFilter = (type: FilterKey, value: boolean) => {
    switch (type) {
      case type:
        return useFiltersStore.setState((state) => ({
          ...state,
          [type]: value,
        }));
    }
  };
}

export default FiltersStore;
