import create from 'zustand';
import { combine } from 'zustand/middleware';

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

export const useFiltersStore = create(
  combine(initialState, (set) => ({
    setFilter: (type: string, value: boolean) => {
      console.log(value);
      set((state) => ({
        ...state,
        [type]: value,
      }));
    },
  }))
);
