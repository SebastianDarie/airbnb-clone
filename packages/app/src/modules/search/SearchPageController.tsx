import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import {GOOGLE_MAPS_API_KEY} from 'react-native-dotenv';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GradientWrapper} from '../../components/GradientWrapper';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {ExploreNavigationProp} from '../../navigation/RootNavigation';

// interface SearchPageControllerProps {
//   navigation: ExploreScreenNavigationProp;
// }

export const SearchPageController: React.FC<ExploreNavigationProp> = ({
  navigation,
}) => {
  const setLocation = useSearchStore(state => state.setLocation);

  return (
    <GradientWrapper>
      {/* <SafeAreaView style={styles.safeView}> */}
      {/* <View style={styles.gradientBackground}> */}
      {/* <ImageBackground
        source={{
          uri:
            'https://a0.muscache.com/im/pictures/Hosting/Gradient/original/8e01f282-bf93-4c7b-b76c-cedded38823c.png',
        }}
        resizeMode="cover"
        style={styles.gradientImage}>
      </ImageBackground> */}

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
            // alignItems: 'center',
          },
        }}
        onPress={(data, details = null) => {
          if (details?.geometry.location) {
            setLocation(details.geometry.location);
            navigation.navigate('Calendar');
          }
        }}
      />
      {/* </View> */}
      {/* </SafeAreaView> */}
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    // position: 'absolute',
  },

  gradientImage: {
    flex: 1,
    position: 'relative',
  },

  safeView: {
    flex: 1,
  },
});
