import {DateObject} from 'react-native-calendars';
import {Point} from 'react-native-google-places-autocomplete';
import create from 'zustand';
import {combine} from 'zustand/middleware';

export const useSearchStore = create(
  combine(
    {
      location: {lat: 0, lng: 0},
      startDate: '',
      endDate: '',
      adults: 0,
      children: 0,
      infants: 0,
    },
    set => ({
      setLocation: (location: Point) => set({location}),
      setStartDate: (startDate: string) => set({startDate}),
      setEndDate: (endDate: string) => set({endDate}),
      setAdults: (adults: number) => set({adults}),
      setChildren: (children: number) => set({children}),
      setInfants: (infants: number) => set({infants}),
    }),
  ),
);
