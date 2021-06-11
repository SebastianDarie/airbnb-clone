import {
  FloorPlanFormProps,
  LocationFormProps,
  PropertyTypeFormProps,
} from '@airbnb-clone/controller';
import create from 'zustand';
import { combine, devtools } from 'zustand/middleware';

const initialState = {
  amenities: [''],
  beds: 1,
  category: '',
  description: '',
  guests: 2,
  latitude: 40,
  longitude: -74.5,
  price: 100,
  title: '',
};

export const useListingStore = create(
  combine(initialState, (set) => ({
    updateForm: (
      data: PropertyTypeFormProps | FloorPlanFormProps | LocationFormProps
    ) => set((state) => ({ ...state, ...data })),
  }))
);
