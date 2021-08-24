import {Geometry} from 'react-native-google-places-autocomplete';
import create from 'zustand';
import {combine} from 'zustand/middleware';

export const useSearchStore = create(
  combine(
    {
      city: '',
      viewPort: {} as Geometry['viewport'],
      startDate: '',
      endDate: '',
      adults: 0,
      children: 0,
      infants: 0,
    },
    set => ({
      setCity: (city: string) => set({city}),
      setViewPort: (viewPort: Geometry['viewport']) => set({viewPort}),
      setStartDate: (startDate: string) => set({startDate}),
      setEndDate: (endDate: string) => set({endDate}),
      setAdults: (adults: number) => set({adults}),
      setChildren: (children: number) => set({children}),
      setInfants: (infants: number) => set({infants}),
    }),
  ),
);
