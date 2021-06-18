import {
  FloorPlanFormProps,
  LocationFormProps,
  PropertyTypeFormProps,
} from '@airbnb-clone/controller';
import create from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  amenities: [''],
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

export const useListingStore = create(
  combine(initialState, (set) => ({
    selectCategory: (category: string) =>
      set((state) => ({ ...state, category })),

    selectType: (type: string) => set((state) => ({ ...state, type })),

    updateForm: (
      data: PropertyTypeFormProps | FloorPlanFormProps | LocationFormProps
    ) => set((state) => ({ ...state, ...data })),
  }))
);
