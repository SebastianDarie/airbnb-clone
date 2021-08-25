import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

interface ListingsMapProps {}

export const ListingsMap: React.FC<ListingsMapProps> = ({}) => {
  const mapRef = useRef<MapView>(null);
  const poiListModalRef = useRef<BottomSheetModal>(null);

  const mapInitialCamera = useMemo(
    () => ({
      center: {
        latitude: 52.3791,
        longitude: 4.9003,
      },
      heading: 0,
      pitch: 0,
      zoom: 0,
      altitude: 40000,
    }),
    [],
  );

  const handleTouchStart = useCallback(() => {
    poiListModalRef.current?.collapse();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialCamera={mapInitialCamera}
        style={styles.mapContainer}
        onTouchStart={handleTouchStart}
        zoomEnabled
        zoomTapEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
