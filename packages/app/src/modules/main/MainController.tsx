import React from 'react';
import {GOOGLE_MAPS_API_KEY} from 'react-native-dotenv';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {BottomNavigator} from '../../navigation/mainNavigator/BottomNavigator';

export const MainController: React.FC = () => {
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Where are you going?"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
      />
      <BottomNavigator />
    </>
  );
};
