import create from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  startDate: (null as unknown) as Date,
  endDate: (null as unknown) as Date,
};

export const useCalendarStore = create(
  combine(initialState, (set) => ({
    updateStart: (date: Date) => {
      set((state) => ({
        ...state,
        startDate: date,
      }));
    },

    updateEnd: (date: Date) => {
      set((state) => ({
        ...state,
        endDate: date,
      }));
    },
  }))
);
