import {
  SearchListingResult,
  SearchListingsQuery,
} from '@second-gear/controller';
import React, {useCallback, useRef} from 'react';
import {Dimensions, FlatList, StyleSheet, View, ViewToken} from 'react-native';
import {ListingCarouselItem} from './ListingCarouselItem';

interface ListingsCarouselProps {
  data: SearchListingsQuery;
  flatlist: React.RefObject<FlatList<any>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const {width} = Dimensions.get('window');

export const ListingsCarousel: React.FC<ListingsCarouselProps> = ({
  data,
  flatlist,
  setSelected,
}) => {
  const viewConfig = useRef({itemVisiblePercentThreshold: 70});
  const onViewChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        const selectedPlace = viewableItems[0].item;
        setSelected(selectedPlace.id);
      }
    },
  );

  const renderCarouselItem = useCallback(
    ({item, index}: {item: SearchListingResult; index: number}) => (
      <ListingCarouselItem
        first={index === 0}
        last={index === data.searchListings.listings.length - 1}
        bedrooms={item.bedrooms}
        beds={item.beds}
        category={item.category}
        cover={item.photos[0]}
        price={item.price}
        title={item.title}
      />
    ),
    [data.searchListings.listings.length],
  );

  return (
    <View style={styles.carouselContainer}>
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
        snapToInterval={width - 20}
        viewabilityConfig={viewConfig.current}
        onViewableItemsChanged={onViewChanged.current}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
});
