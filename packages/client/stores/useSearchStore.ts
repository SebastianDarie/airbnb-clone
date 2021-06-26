import create from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  suggestion: '',
  latitude: 0,
  longitude: 0,
  adults: 0,
  children: 0,
  infants: 0,
};

export const useSearchStore = create(
  combine(initialState, (set, get) => ({
    setLocation: (s: string, lat: number, long: number) =>
      set((state) => ({
        ...state,
        suggestion: s,
        latitude: lat,
        longitude: long,
      })),

    updateAdults: (value: number) =>
      set((state) => ({
        ...state,
        adults: value,
      })),

    updateChildren: (value: number) =>
      set((state) => ({
        ...state,
        children: value,
      })),

    updateInfants: (value: number) =>
      set((state) => ({
        ...state,
        infants: value,
      })),

    resetGuests: () =>
      set((state) => ({
        ...state,
        adults: 0,
        children: 0,
        infants: 0,
      })),
  }))
);
