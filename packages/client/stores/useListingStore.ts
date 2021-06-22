import create from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  amenities: [''],
  bathrooms: 1,
  bedrooms: 1,
  beds: 1,
  category: 'Apartment',
  description: '',
  guests: 2,
  highlights: [] as string[],
  latitude: 40,
  longitude: -74.5,
  photos: [] as string[],
  price: 100,
  title: '',
  type: 'Rental unit',
};

export const useListingStore = create(
  combine(initialState, (set, get) => ({
    selectCategory: (category: string) =>
      set((state) => ({ ...state, category })),

    selectType: (type: string) => set((state) => ({ ...state, type })),

    updateFloor: (type: string, value: number) =>
      set((state) => ({
        ...state,
        beds: type === 'Beds' ? value : get().beds,
        guests: type === 'Guests' ? value : get().guests,
        price: type === 'Price' ? value : get().price,
      })),

    updateAmenities: (amenity: string) =>
      set((state) => {
        const idx = get().amenities.indexOf(amenity);
        if (idx !== -1) {
          state.amenities.splice(idx, 1);
          return {
            ...state,
            amenities: [...state.amenities],
          };
        } else {
          return {
            ...state,
            amenities: [...state.amenities, amenity],
          };
        }
      }),

    addPhoto: (photo: string) =>
      set((state) => ({
        ...state,
        photos: [...state.photos, photo],
      })),

    removePhoto: (id: string) =>
      set((state) => ({
        ...state,
        photos: state.photos.filter((_p, i) => i !== parseInt(id) - 1),
      })),

    addTitle: (title: string) =>
      set((state) => ({
        ...state,
        title,
      })),

    updateHighlights: (highlight: string) =>
      set((state) => {
        const idx = get().highlights.indexOf(highlight);
        if (idx !== -1) {
          state.highlights.splice(idx, 1);
          return {
            ...state,
            highlights: [...state.highlights],
          };
        } else if (state.highlights.length === 2) {
          state.highlights.shift();
          return {
            ...state,
            highlights: [...state.highlights, highlight],
          };
        } else {
          return {
            ...state,
            highlights: [...state.highlights, highlight],
          };
        }
      }),
  }))
);
