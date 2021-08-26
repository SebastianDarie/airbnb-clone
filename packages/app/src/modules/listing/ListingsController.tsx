import {useSearchListingsQuery} from '@second-gear/controller';
import LottieView from 'lottie-react-native';
import React, {useCallback, useLayoutEffect, useMemo, useRef} from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors, Subheading} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import shallow from 'zustand/shallow';
import {ListingCard} from '../../components/listing/ListingCard';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {ListingsScreenNavigationProp} from '../../navigation/RootNavigation';
import {useFocusEffect} from '@react-navigation/native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import HeaderHandle from '../../components/header/HeaderHandle';
import {ListingsMap} from '../../components/listing/ListingsMap';

export const ListingsController: React.FC<ListingsScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);
  const [adults, children, infants, viewPort, city] = useSearchStore(
    state => [
      state.adults,
      state.children,
      state.infants,
      state.viewPort,
      state.city,
    ],
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>{city}</Text>,
    });
  }, [city, navigation]);

  const snapPoints = useMemo(() => ['10%', '50%', '100%'], []);

  const handleRefresh = useCallback(() => {
    console.log('refresh');
  }, []);
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderHeaderHandle = useCallback(
    props => (
      <HeaderHandle
        {...props}
        children={
          <View style={styles.listHeader}>
            <Subheading style={styles.placesCount}>
              300+ places to stay
            </Subheading>
          </View>
        }
      />
    ),
    [],
  );

  const renderItem = useCallback(
    ({item}) => (
      <ListingCard
        category={item.category}
        city={item.city}
        images={item.photos}
        price={item.price}
        reviews={item.reviews}
        title={item.title}
        onPress={() => navigation.navigate('Room', {roomId: item.id})}
      />
    ),
    [navigation],
  );

  if (loading) {
    return (
      <LottieView
        source={require('../../assets/material-wave-loading.json')}
        style={styles.lottie}
        resizeMode="center"
        autoPlay
        autoSize
        loop
      />
    );
  }

  //console.log(data);
  return (
    <>
      {data && (
        <ListingsMap data={data} navigation={navigation} route={route}>
          {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.white} /> */}

          {/* <BottomSheet
              animateOnMount
              ref={sheetRef}
              snapPoints={snapPoints}
              handleComponent={renderHeaderHandle}
              onChange={handleSnapPress}
              onClose={handleClosePress}>
              <BottomSheetFlatList
                data={data.searchListings.listings}
                keyExtractor={listing => listing.id}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
                focusHook={useFocusEffect}
                onLayout={handleContentLayout}
                onRefresh={handleRefresh}
              />
            </BottomSheet> */}

          {/* <View style={[styles.mapBtnWrapper]}>
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
            </View> */}
        </ListingsMap>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: -20,
    marginBottom: 2,
  },

  lottie: {flex: 1, alignSelf: 'center'},

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    backgroundColor: Colors.white,
  },

  listingsContainer: {
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: 24,
    paddingTop: 200,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 25,
  },

  placesCount: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  mapBtnWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
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
