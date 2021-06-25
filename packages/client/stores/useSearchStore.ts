import create from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  adults: 0,
  children: 0,
  infants: 0,
};

export const useSearchStore = create(
  combine(initialState, (set, get) => ({
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
