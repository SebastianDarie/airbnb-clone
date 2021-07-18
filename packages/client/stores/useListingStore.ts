import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Photo } from '@airbnb-clone/common';
import { LatLon } from 'use-places-autocomplete';

interface ListingState {
  addressFound: boolean;
  amenities: string[];
  bathrooms: number;
  bedrooms: number;
  beds: number;
  category: string;
  city: string;
  coords: LatLon;
  description: string;
  guests: number;
  highlights: string[];
  photos: [File, Photo][];
  price: number;
  title: string;
  type: string;
}

namespace ListingStore {
  export const useListingStore = create<ListingState>(
    devtools(() => ({
      addressFound: false as boolean,
      amenities: [''],
      bathrooms: 1,
      bedrooms: 1,
      beds: 1,
      category: 'Apartment',
      city: '',
      coords: {} as any,
      description: '',
      guests: 2,
      highlights: [''],
      photos: [] as any,
      price: 10,
      title: '',
      type: 'Rental unit',
    }))
  );

  export const selectCategory = (category: string) =>
    useListingStore.setState((state) => ({ ...state, category }));

  export const selectType = (type: string) =>
    useListingStore.setState((state) => ({ ...state, type }));

  export const updateLocation = (city: string, coords: LatLon) =>
    useListingStore.setState((state) => ({ ...state, city, coords }));

  export const setAddressFound = (addressFound: boolean) =>
    useListingStore.setState((state) => ({ ...state, addressFound }));

  export const updateFloor = (type: string, value: number) =>
    useListingStore.setState((state) => ({
      ...state,
      guests: type === 'Guests' ? value : state.guests,
      beds: type === 'Beds' ? value : state.beds,
      bedrooms: type === 'Bedrooms' ? value : state.bedrooms,
      bathrooms: type === 'Bathrooms' ? value : state.bathrooms,
    }));

  export const updateAmenities = (amenity: string) =>
    useListingStore.setState((state) => {
      const idx = state.amenities.indexOf(amenity);
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
    });

  export const addPhoto = (file: File, photo: Photo) =>
    useListingStore.setState((state) => ({
      ...state,
      photos: [...state.photos, [file, photo]],
    }));

  export const removePhoto = (id: string) =>
    useListingStore.setState((state) => ({
      ...state,
      photos: state.photos.filter((_p, i) => i !== parseInt(id) - 1),
    }));

  export const addTitle = (title: string) =>
    useListingStore.setState((state) => ({
      ...state,
      title,
    }));

  export const updateHighlights = (highlight: string) =>
    useListingStore.setState((state) => {
      const idx = state.highlights.indexOf(highlight);
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
    });

  export const addDescription = (description: string) =>
    useListingStore.setState((state) => ({
      ...state,
      description,
    }));

  export const updatePrice = (price: number) =>
    useListingStore.setState((state) => ({
      ...state,
      price,
    }));
}

export default ListingStore;
