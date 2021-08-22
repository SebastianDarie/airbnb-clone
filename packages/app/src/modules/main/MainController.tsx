import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GOOGLE_MAPS_API_KEY} from 'react-native-dotenv';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {ExploreStackParamList} from '../../navigation/mainNavigator/BottomNavigator';

interface MainControllerProps {
  navigation: NativeStackNavigationProp<ExploreStackParamList, 'Main'>;
}

export const MainController: React.FC<MainControllerProps> = ({navigation}) => {
  const [search, setSearch] = React.useState(false);

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Pressable
          android_ripple={{borderless: true, radius: 5}}
          onPress={() => setSearch(true)}>
          <View style={styles.searchArea}>
            <View style={styles.flex}>
              <FontAwesome5Icon name="search" color="#ff385c" size={15} />
              <Text style={styles.placeholderText}>Where are you going?</Text>
            </View>
          </View>
        </Pressable>
        {/* <Modal visible={search} animationType="slide">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#5b49a4', '#8e4a99', '#bd487f', '#d44a76']}>
            <StatusBar
              animated={true}
              barStyle="light-content"
              backgroundColor="transparent"
              translucent={true}
            />
          </LinearGradient>

          <SafeAreaView style={styles.modalArea}>
            <GooglePlacesAutocomplete
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
              placeholder="Where are you going?"
              renderLeftButton={() => (
                <IconButton
                  icon="arrow-left"
                  style={styles.backBtn}
                  onPress={() => setSearch(false)}
                />
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
        </Modal> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },

  searchArea: {
    backgroundColor: Colors.white,
    borderColor: 'transparent',
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  placeholderText: {
    color: Colors.black,
    fontSize: 16,
    marginLeft: 10,
  },

  modalArea: {
    flex: 1,
    borderRadius: 50,
  },

  backBtn: {
    // marginRight: -15,
  },
});
