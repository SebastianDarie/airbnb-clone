import {useSearchListingsQuery} from '@second-gear/controller';
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {Colors, Headline, IconButton, Subheading} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import shallow from 'zustand/shallow';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListingCard} from '../../components/ListingCard';
import {
  ExploreNavigationProp,
  ExploreScreenNavigationProp,
  ListingsScreenNavigationProp,
} from '../../navigation/RootNavigation';

export const ListingsController: React.FC<ListingsScreenNavigationProp> = ({
  navigation,
}) => {
  const [adults, children, infants, viewPort] = useSearchStore(
    state => [state.adults, state.children, state.infants, state.viewPort],
    shallow,
  );
  const {data, loading} = useSearchListingsQuery({
    variables: {
      input: {
        guests: adults + children + infants,
        bounds: {northEast: viewPort.northeast, southWest: viewPort.southwest},
      },
      limit: 20,
      cursor: null,
    },
  });

  if (loading) {
    return (
      <LottieView
        source={require('../../assets/material-wave-loading.json')}
        autoPlay
        loop
      />
    );
  }

  console.log(data);
  return (
    <>
      {data && (
        <SafeAreaView style={styles.container}>
          <View style={styles.listingsContainer}>
            <FlatList
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  <View>
                    <Subheading style={styles.placesCount}>
                      300+ places to stay
                    </Subheading>
                  </View>
                  <IconButton icon="filter-variant" style={styles.filterBtn} />
                </View>
              }
              data={data.searchListings.listings}
              keyExtractor={listing => listing.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ListingCard
                  images={item.photos}
                  price={item.price}
                  reviews={item.reviews}
                  title={item.title}
                  onPress={() => navigation.navigate('Room', {roomId: item.id})}
                />
              )}
            />
            <View style={styles.mapBtnWrapper}>
              <View style={styles.mapBtnContainer}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Calendar')}>
                  <View style={styles.mapBtn}>
                    <MaterialCommunityIcons
                      name="map"
                      color={Colors.white}
                      size={20}
                    />
                    <Text style={styles.label}>Map</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  listingsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 30,
  },

  placesCount: {
    fontWeight: 'bold',
  },

  filterBtn: {
    height: 50,
    width: 20,
  },

  mapBtnWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    //width: '25%',
  },

  mapBtnContainer: {
    width: '100%',
  },

  mapBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 25,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  label: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 3,
  },
});
