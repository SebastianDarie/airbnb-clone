import create from 'zustand';
import { devtools } from 'zustand/middleware';

type FiltersState = {
  Wifi: boolean;
  Kitchen: boolean;
  Airconditioning: boolean;
  Washer: boolean;
  Iron: boolean;
  Petsallowed: boolean;
  Dedicatedworkspace: boolean;
  Freeparking: boolean;
  Dryer: boolean;
  Pool: boolean;
  Gym: boolean;
};

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
  export const useFiltersStore = create<FiltersState>(
    devtools(() => initialState)
  );
  // export const setWifi = (value: boolean) =>
  //   useFiltersStore.setState({ Wifi: !value });
  // export const setKitchen = (value: boolean) =>
  //   useFiltersStore.setState({ Kitchen: !value });
  // export const setAir = (value: boolean) =>
  //   useFiltersStore.setState({ Airconditioning: !value });
  // export const setWasher = (value: boolean) =>
  //   useFiltersStore.setState({ Washer: !value });
  // export const setIron = (value: boolean) =>
  //   useFiltersStore.setState({ Iron: !value });
  export const setFilter = (type: FilterKey, value: boolean) => {
    switch (type) {
      // case 'Wifi':
      //   useFiltersStore.setState({ [type]: value });
      //   break;
      case type:
        useFiltersStore.setState((state) => ({
          ...state,
          [type]: value,
        }));
        break;
    }
  };
}

export default FiltersStore;
