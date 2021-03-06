import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import {
  SearchListingResult,
  useSearchListingsQuery,
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
  Animated,
  Dimensions,
  Easing,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Camera, Region} from 'react-native-maps';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import shallow from 'zustand/shallow';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {RoomPageController} from '../../modules/room/RoomPageController';
import {ListingsScreenNavigationProp} from '../../navigation/RootNavigation';
import HeaderHandle from '../header/HeaderHandle';
import {MapMarker} from '../MapMarker';
import {ListingCard} from './ListingCard';
import {ListingsCarousel} from './ListingsCarousel';

export interface ListingsMapProps extends ListingsScreenNavigationProp {}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const HANDLE_HEIGHT = 69;
const LOCATION_DETAILS_HEIGHT = 345;

export const ListingsMap: React.FC<ListingsMapProps> = ({}) => {
  const [adults, children, infants, location, viewPort] = useSearchStore(
    state => [
      state.adults,
      state.children,
      state.infants,
      state.location,
      state.viewPort,
      state.city,
    ],
    shallow,
  );
  const bounds = {northEast: viewPort.northeast, southWest: viewPort.southwest};
  const guests = adults + children + infants;
  const {data, loading, fetchMore, refetch} = useSearchListingsQuery({
    variables: {
      input: {bounds, guests},
      limit: 20,
      cursor: null,
    },
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const flatlist = useRef<FlatList>(null);
  const mapRef = useRef<MapView>(null);
  const poiListModalRef = useRef<BottomSheetModal>(null);
  const poiDetailsModalRef = useRef<BottomSheetModal>(null);

  const {top: topSafeArea, bottom: bottomSafeArea} = useSafeAreaInsets();

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

  const flatlistOpacity = useMemo(() => new Animated.Value(0), []);
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

  const fade = useCallback(() => {
    Animated.timing(flatlistOpacity, {
      toValue: isVisible ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setIsVisible(!isVisible));
  }, [flatlistOpacity, isVisible]);

  const handlePress = useCallback(
    () => {
      if (animatedPOIListIndex.value === 1) {
        poiListModalRef.current?.collapse();
        mapRef.current?.animateCamera({
          center: {
            latitude: location.lat,
            longitude: location.lng,
          },
          zoom: 12,
        });
      } else if (animatedPOIListIndex.value === 0) {
        fade();
      }
    },
    //@ts-ignore
    [animatedPOIListIndex.value, fade, location.lat, location.lng],
  );
  const handleChange = useCallback(() => {
    if (animatedPOIListIndex.value === 1) {
      mapRef.current?.animateCamera({
        center: {
          latitude: location.lat,
          longitude: location.lng,
        },
        zoom: 11,
      });
    } else if (animatedPOIListIndex.value === 0) {
      mapRef.current?.animateCamera({
        center: {
          latitude: location.lat,
          longitude: location.lng,
        },
        zoom: 12,
      });
    }
  }, [animatedPOIListIndex.value, location.lat, location.lng]);
  const handleCloseLocationDetails = useCallback(() => {
    setSelected('');
    poiDetailsModalRef.current?.dismiss();
  }, []);
  const handlePresentRoomDetails = useCallback((item: SearchListingResult) => {
    setSelected(item.id);
    poiDetailsModalRef.current?.present();
  }, []);
  const handleRefresh = useCallback(() => {
    refetch({
      input: {
        guests: adults + children + infants,
        bounds: {northEast: viewPort.northeast, southWest: viewPort.southwest},
      },
      limit: 20,
      cursor: null,
    });
  }, [
    adults,
    children,
    infants,
    refetch,
    viewPort.northeast,
    viewPort.southwest,
  ]);

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
    if (!data?.searchListings.listings || !selected || !flatlist) {
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
  }, [data?.searchListings.listings, selected]);

  useLayoutEffect(() => {
    requestAnimationFrame(() => poiListModalRef.current?.present());
  }, []);

  const renderHeaderHandle = useCallback(
    props => (
      <HeaderHandle
        title={`${data?.searchListings.listings.length || 0} places to stay`}
        {...props}
      />
    ),
    [data?.searchListings.listings.length],
  );

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
        onPress={() => {
          handlePresentRoomDetails(item);
        }}
      />
    ),
    [handlePresentRoomDetails],
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <MapView
          ref={mapRef}
          initialCamera={mapInitialCamera}
          style={styles.mapContainer}
          onPress={handlePress}
          cacheEnabled
          loadingEnabled
          zoomEnabled
          zoomTapEnabled>
          {data?.searchListings.listings.map(l => (
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
          index={0}
          snapPoints={poiListSnapPoints}
          handleHeight={HANDLE_HEIGHT}
          topInset={topSafeArea}
          enableDismissOnClose={false}
          enablePanDownToClose={false}
          animatedPosition={animatedPOIListPosition}
          animatedIndex={animatedPOIListIndex}
          backdropComponent={renderBackdrop}
          handleComponent={renderHeaderHandle}
          onChange={handleChange}>
          <BottomSheetFlatList
            data={data?.searchListings.listings}
            keyExtractor={listing => listing.id}
            renderItem={renderItem}
            style={scrollViewStyle}
            contentContainerStyle={scrollViewContentContainer}
            focusHook={useFocusEffect}
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            refreshing={false}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={30}
            onEndReached={() =>
              fetchMore({
                variables: {
                  input: {bounds, guests},
                  limit: 20,
                  cursor:
                    data?.searchListings.listings[
                      data.searchListings.listings.length - 1
                    ].createdAt,
                },
              })
            }
            onRefresh={handleRefresh}
          />
        </BottomSheetModal>

        <BottomSheetModal
          ref={poiDetailsModalRef}
          key="PoiDetailsSheet"
          name="PoiDetailsSheet"
          snapPoints={poiDetailsSnapPoints}
          topInset={topSafeArea}
          animatedIndex={animatedPOIDetailsIndex}
          animatedPosition={animatedPOIDetailsPosition}>
          <RoomPageController
            id={selected}
            onClose={handleCloseLocationDetails}
          />
        </BottomSheetModal>

        <ListingsCarousel
          data={data}
          flatlist={flatlist}
          flatlistOpacity={flatlistOpacity}
          isVisible={isVisible}
          handlePresentRoomDetails={handlePresentRoomDetails}
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
  scrollView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
  },
});
