import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  SearchListingResult,
  SearchListingsQuery,
} from '@second-gear/controller';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import MapView, {Camera, Region} from 'react-native-maps';
import {Subheading} from 'react-native-paper';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {ListingsScreenNavigationProp} from '../../navigation/RootNavigation';
import HeaderHandle from '../header/HeaderHandle';
import {MapMarker} from '../MapMarker';
import {ListingCard} from './ListingCard';
import {ListingCarouselItem} from './ListingCarouselItem';
import {ListingsCarousel} from './ListingsCarousel';

export interface ListingsMapProps extends ListingsScreenNavigationProp {
  data: SearchListingsQuery;
}

const {height: SCREEN_HEIGHT, width} = Dimensions.get('window');

const HANDLE_HEIGHT = 19;
const LOCATION_DETAILS_HEIGHT = 298;

export const ListingsMap: React.FC<ListingsMapProps> = ({data, navigation}) => {
  const location = useSearchStore(state => state.location);
  const [selected, setSelected] = useState<string>('');
  const flatlist = useRef<FlatList>(null);
  const mapRef = useRef<MapView>(null);
  const poiListModalRef = useRef<BottomSheetModal>(null);
  const poiDetailsModalRef = useRef<BottomSheetModal>(null);

  // const {width} = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const {bottom: bottomSafeArea} = useSafeAreaInsets();

  const mapInitialCamera: Camera = useMemo(
    () => ({
      center: {
        latitude: location.lat,
        longitude: location.lng,
      },
      altitude: 0,
      heading: 0,
      pitch: 0,
      zoom: 12,
    }),
    [location.lat, location.lng],
  );

  const animatedPOIListIndex = useSharedValue<number>(0);
  const animatedPOIListPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const animatedPOIDetailsIndex = useSharedValue<number>(0);
  const animatedPOIDetailsPosition = useSharedValue<number>(SCREEN_HEIGHT);

  const poiListSnapPoints = useMemo(
    () => [
      bottomSafeArea + HANDLE_HEIGHT,
      LOCATION_DETAILS_HEIGHT + bottomSafeArea,
      '100%',
    ],
    [bottomSafeArea],
  );
  const poiDetailsSnapPoints = useMemo(
    () => [LOCATION_DETAILS_HEIGHT + bottomSafeArea + HANDLE_HEIGHT, '100%'],
    [bottomSafeArea],
  );

  const handleTouchStart = useCallback(() => {
    poiListModalRef.current?.collapse();
  }, []);

  const scrollViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: animatedPOIListIndex.value,
  }));
  const scrollViewStyle = useMemo(
    () => [styles.scrollView, scrollViewAnimatedStyle],
    [scrollViewAnimatedStyle],
  );
  const scrollViewContentContainer = useMemo(
    () => [styles.scrollViewContentContainer, {paddingBottom: bottomSafeArea}],
    [bottomSafeArea],
  );

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {height: 0},
    });
  }, [navigation]);

  useEffect(() => {
    if (!data.searchListings.listings || !selected || !flatlist) {
      return;
    }

    const index = data.searchListings.listings.findIndex(
      l => l.id === selected,
    );
    flatlist.current?.scrollToIndex({index});

    const selectedPlace = data.searchListings.listings[index];
    const region: Region = {
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.12,
      longitudeDelta: 0.12,
    };
    mapRef.current?.animateToRegion(region);
  }, [data.searchListings.listings, selected]);

  useLayoutEffect(() => {
    requestAnimationFrame(() => poiListModalRef.current?.present());
  }, []);

  console.log(animatedPOIListPosition);

  // const renderHeaderHandle = useCallback(
  //   props => (
  //     <HeaderHandle
  //       {...props}
  //       children={
  //         <View style={styles.listHeader}>
  //           <Subheading style={styles.placesCount}>
  //             300+ places to stay
  //           </Subheading>
  //         </View>
  //       }
  //     />
  //   ),
  //   [],
  // );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={true}
        pressBehavior="none"
        appearsOnIndex={2}
        disappearsOnIndex={1}
      />
    ),
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: SearchListingResult}) => (
      <ListingCard
        category={item.category}
        city={item.city}
        images={item.photos}
        price={item.price}
        reviews={item.reviews}
        title={item.title}
        //onPress={() => navigation.navigate('Room', {roomId: item.id})}
      />
    ),
    [],
  );

  // const renderCarouselItem = useCallback(
  //   ({item, index}: {item: SearchListingResult; index: number}) => (
  //     <ListingCarouselItem
  //       first={index === 0}
  //       last={index === data.searchListings.listings.length - 1}
  //       bedrooms={item.bedrooms}
  //       beds={item.beds}
  //       category={item.category}
  //       cover={item.photos[0]}
  //       price={item.price}
  //       title={item.title}
  //     />
  //   ),
  //   [data.searchListings.listings.length],
  // );

  // const filteredLocations = (arr: SearchListingResult[]) => {
  //   const hash = Object.create(null);
  //   const result = arr.map(x => {
  //     const latLng = `${x.latitude}_${x.longitude}`;
  //     if (hash[latLng]) {
  //       return {
  //         ...x,
  //         location: {
  //           lat: x.latitude - 0.1,
  //           lng: x.longitude,
  //         },
  //       };
  //     }
  //     hash[latLng] = true;
  //     return x;
  //   });
  //   return result;
  // };

  // const filteredArr = filteredLocations(data.searchListings.listings);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <MapView
          ref={mapRef}
          initialCamera={mapInitialCamera}
          style={styles.mapContainer}
          onTouchStart={handleTouchStart}
          cacheEnabled
          zoomEnabled
          zoomTapEnabled>
          {data.searchListings.listings.map(l => (
            <MapMarker
              key={l.id}
              coordinate={{latitude: l.latitude, longitude: l.longitude}}
              isSelected={l.id === selected}
              price={l.price}
              onPress={() => setSelected(l.id)}
            />
          ))}
        </MapView>
        <BottomSheetModal
          ref={poiListModalRef}
          key="PoiListSheet"
          name="PoiListSheet"
          index={1}
          snapPoints={poiListSnapPoints}
          handleHeight={HANDLE_HEIGHT}
          topInset={headerHeight}
          enableDismissOnClose={false}
          enablePanDownToClose={false}
          animatedPosition={animatedPOIListPosition}
          animatedIndex={animatedPOIListIndex}
          backdropComponent={renderBackdrop}
          // handleComponent={renderHeaderHandle}
        >
          <BottomSheetFlatList
            data={data.searchListings.listings}
            keyExtractor={listing => listing.id}
            renderItem={renderItem}
            style={scrollViewStyle}
            contentContainerStyle={scrollViewContentContainer}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Subheading style={styles.placesCount}>
                  300+ places to stay
                </Subheading>
              </View>
            }
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheetModal>

        <BottomSheetModal
          ref={poiDetailsModalRef}
          key="PoiDetailsSheet"
          name="PoiDetailsSheet"
          snapPoints={poiDetailsSnapPoints}
          topInset={headerHeight}
          animatedIndex={animatedPOIDetailsIndex}
          animatedPosition={animatedPOIDetailsPosition}>
          <Text>Test</Text>
        </BottomSheetModal>

        {/* <View style={styles.carouselContainer}>
          <FlatList
            ref={flatlist}
            data={data.searchListings.listings}
            keyExtractor={listing => listing.id}
            renderItem={renderCarouselItem}
            decelerationRate="fast"
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={width - 60}
            contentInset={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            horizontal
          />
        </View> */}
        <ListingsCarousel
          data={data}
          flatlist={flatlist}
          setSelected={setSelected}
        />
      </View>
    </BottomSheetModalProvider>
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
  carouselContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
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
  scrollView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
  },
});

//export default withModalProvider(ListingsMap);
