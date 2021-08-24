import create from "zustand";

interface SearchState {
  suggestion: string;
  latitude: number;
  longitude: number;
  bounds: google.maps.LatLngBounds;
  adults: number;
  children: number;
  infants: number;
}

const initialState = {
  suggestion: "",
  latitude: 0,
  longitude: 0,
  bounds: {} as google.maps.LatLngBounds,
  adults: 0,
  children: 0,
  infants: 0,
};

namespace SearchStore {
  export const useSearchStore = create<SearchState>(() => initialState);

  export const setLocation = (
    s: string,
    lat: number,
    lng: number,
    bounds: google.maps.LatLngBounds
  ) =>
    useSearchStore.setState((state) => ({
      ...state,
      suggestion: s,
      latitude: lat,
      longitude: lng,
      bounds,
    }));

  export const updateAdults = (adults: number) =>
    useSearchStore.setState((state) => ({
      ...state,
      adults,
    }));

  export const updateChildren = (children: number) =>
    useSearchStore.setState((state) => ({
      ...state,
      children,
    }));

  export const updateInfants = (infants: number) =>
    useSearchStore.setState((state) => ({
      ...state,
      infants,
    }));

  export const resetGuests = () =>
    useSearchStore.setState((state) => ({
      ...state,
      adults: 0,
      children: 0,
      infants: 0,
    }));
}

export default SearchStore;
