import create from 'zustand';
import { devtools } from 'zustand/middleware';

type ReservationState = {
  startDate: Date | null;
  endDate: Date | null;
  adults: number;
  children: number;
  infants: number;
};

namespace ReservationStore {
  export const useReservationStore = create<ReservationState>(
    devtools(() => ({
      startDate: null as Date | null,
      endDate: null as Date | null,
      adults: 0,
      children: 0,
      infants: 0,
    }))
  );
  export const updateStart = (date: Date) =>
    useReservationStore.setState((state) => ({ ...state, startDate: date }));
  export const updateEnd = (date: Date) =>
    useReservationStore.setState((state) => ({ ...state, endDate: date }));
  export const updateAdults = (value: number) =>
    useReservationStore.setState((state) => ({ ...state, adults: value }));
  export const updateChildren = (value: number) =>
    useReservationStore.setState((state) => ({ ...state, children: value }));
  export const updateInfants = (value: number) =>
    useReservationStore.setState((state) => ({ ...state, infants: value }));
}

export default ReservationStore;
