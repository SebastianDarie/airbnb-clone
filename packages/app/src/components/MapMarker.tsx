/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AnimatedRegion, LatLng, Marker} from 'react-native-maps';

interface MapMarkerProps {
  coordinate: LatLng | AnimatedRegion;
  isSelected: boolean;
  price: number;
  onPress: () => void;
}

export const MapMarker: React.FC<MapMarkerProps> = React.memo(
  ({coordinate, isSelected, price, onPress}) => {
    return (
      <Marker
        coordinate={coordinate}
        tracksViewChanges={false}
        onPress={onPress}>
        <View
          style={[
            styles.pillContainer,
            {backgroundColor: isSelected ? 'black' : 'white'},
          ]}>
          <Text
            style={{color: isSelected ? 'white' : 'black', fontWeight: 'bold'}}>
            ${price}
          </Text>
        </View>
      </Marker>
    );
  },
);

const styles = StyleSheet.create({
  pillContainer: {
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    textAlign: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
