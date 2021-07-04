import create from 'zustand';
import { combine } from 'zustand/middleware';

const weekLater = new Date();
weekLater.setDate(weekLater.getDate() + 7);

const initialState = {
  startDate: new Date(),
  endDate: weekLater,
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
