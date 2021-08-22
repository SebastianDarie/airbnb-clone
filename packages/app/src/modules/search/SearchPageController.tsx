import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GOOGLE_MAPS_API_KEY} from 'react-native-dotenv';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ExploreStackParamList} from '../../navigation/mainNavigator/BottomNavigator';

interface SearchPageControllerProps {
  navigation: NativeStackNavigationProp<ExploreStackParamList, 'Search'>;
}

export const SearchPageController: React.FC<SearchPageControllerProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <GooglePlacesAutocomplete
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        placeholder="Where are you going?"
        renderLeftButton={() => (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        )}
        styles={{
          container: {
            // paddingHorizontal: 15,
            paddingTop: 15,
          },
          textInput: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          textInputContainer: {
            color: Colors.black,
            // alignItems: 'center',
          },
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
      />
    </SafeAreaView>
  );
};
