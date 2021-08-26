import React from 'react';
import {GOOGLE_MAPS_API_KEY} from 'react-native-dotenv';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors, IconButton} from 'react-native-paper';
import {GradientWrapper} from '../../components/GradientWrapper';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {SearchScreenNavigationProp} from '../../navigation/RootNavigation';

export const SearchPageController: React.FC<SearchScreenNavigationProp> = ({
  navigation,
}) => {
  const [setCity, setLocation, setViewPort] = useSearchStore(state => [
    state.setCity,
    state.setLocation,
    state.setViewPort,
  ]);

  return (
    <GradientWrapper>
      <GooglePlacesAutocomplete
        fetchDetails={true}
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
            paddingHorizontal: 15,
            paddingTop: 15,
          },
          textInput: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          textInputContainer: {
            color: Colors.black,
          },
        }}
        onPress={(data, details = null) => {
          if (details?.geometry.location) {
            setCity(details.name);
            setLocation(details.geometry.location);
            setViewPort(details.geometry.viewport);
            navigation.navigate('Calendar');
          }
        }}
      />
    </GradientWrapper>
  );
};
