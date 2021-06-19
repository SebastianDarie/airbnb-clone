import {
  FloorPlanFormProps,
  LocationFormProps,
  PropertyTypeFormProps,
} from '@airbnb-clone/controller';
import create, { GetState } from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  amenities: [''],
  bathrooms: 1,
  bedrooms: 1,
  beds: 1,
  category: 'apartment',
  description: '',
  guests: 2,
  latitude: 40,
  longitude: -74.5,
  price: 100,
  title: '',
  type: 'rental unit',
};

// const isType = (
//   type: string,
//   get: GetState<{
//     beds: number;
//     guests: number;
//     price: number;
//   }>
// ) => {
//   switch (type) {
//     case 'beds':
//       return {
//         stateBeds: get().beds,
//       };

//     case 'guests':
//       return {
//         stateGuests: get().guests,
//       };

//     case 'price':
//       return {
//         statePrice: get().price,
//       };
//   }
// };

export const useListingStore = create(
  combine(initialState, (set, get) => ({
    selectCategory: (category: string) =>
      set((state) => ({ ...state, category })),

    selectType: (type: string) => set((state) => ({ ...state, type })),

    updateFloor: (type: string, value: number) => {
      set((state) => ({
        ...state,
        beds: type === 'beds' ? value : get().beds,
        guests: type === 'guests' ? value : get().guests,
        price: type === 'price' ? value : get().price,
      }));
    },

    // updateForm: (
    //   data: PropertyTypeFormProps | FloorPlanFormProps | LocationFormProps
    // ) => set((state) => ({ ...state, ...data })),
  }))
);
