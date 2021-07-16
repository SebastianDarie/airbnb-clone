import create from 'zustand';
import { devtools } from 'zustand/middleware';
import MarkerWithLabel from '@googlemaps/markerwithlabel';

type MarkersState = {
  markers: MarkerWithLabel[];
};

namespace MarkersStore {
  export const useMarkersStore = create<MarkersState>(
    devtools(() => ({
      markers: [] as any,
    }))
  );
  export const addMarker = (marker: MarkerWithLabel) =>
    useMarkersStore.setState((state) => ({
      markers: [...state.markers, marker],
    }));
}

export default MarkersStore;
