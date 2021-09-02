import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {MainScreenNavigationProp} from '../../navigation/RootNavigation';

export const MainController: React.FC<MainScreenNavigationProp> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      {/* <ImageBackground
        resizeMode="cover"
        source={{
          uri:
            'https://ik.imagekit.io/1nlnne3ilbe/airbnb-forest_S4wSXhI7g.webp?updatedAt=1630506688817&tr=w-1080,h-566,fo-auto',
        }}
        style={styles.bgImage}></ImageBackground> */}
      <FastImage
        resizeMode="cover"
        source={{
          uri:
            'https://ik.imagekit.io/1nlnne3ilbe/airbnb-forest_S4wSXhI7g.webp?updatedAt=1630506688817&tr=w-1080,h-566,fo-auto',
        }}
        style={styles.bgImage}
      />
      <View style={styles.searchContainer}>
        <Pressable
          android_ripple={{borderless: true, radius: 5}}
          onPress={() => navigation.navigate('Search')}>
          <View style={styles.searchArea}>
            <View style={styles.flex}>
              <FontAwesome5Icon name="search" color="#ff385c" size={15} />
              <Text style={styles.placeholderText}>Where are you going?</Text>
            </View>
          </View>
        </Pressable>
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

  bgImage: {flex: 1, justifyContent: 'center', height: 100, width: '100%'},
});
