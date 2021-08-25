import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Review} from '@second-gear/controller';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList, NativeViewGestureHandler} from 'react-native-gesture-handler';
import {Colors, Paragraph, Title} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ListingCardProps {
  category: string;
  city: string;
  images: string[];
  price: number;
  reviews: ({
    __typename?: 'Review' | undefined;
  } & Pick<Review, 'id' | 'rating'>)[];
  title: string;
  onPress: () => void;
}

const {height, width} = Dimensions.get('window');

export const ListingCard: React.FC<ListingCardProps> = ({
  category,
  city,
  images,
  price,
  reviews,
  title,
  onPress,
}) => {
  let rating = 0;
  for (let i = 0; i < reviews.length; i++) {
    rating += reviews[i].rating;
  }
  return (
    <NativeViewGestureHandler disallowInterruption>
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.container}>
          <FlatList
            data={images}
            keyExtractor={(_item, index) => 'key: ' + index}
            renderItem={({item}) => {
              return (
                <View>
                  <FastImage
                    style={styles.image}
                    source={{uri: item, priority: FastImage.priority.normal}}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
              );
            }}
            decelerationRate="fast"
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            style={styles.imagesList}
            horizontal
            pagingEnabled
            scrollEnabled
          />
        </View>
        <View style={styles.listingDetails}>
          <View style={styles.reviewsContainer}>
            {reviews.length < 1 ? (
              <Paragraph style={styles.norev}>No reviews yet</Paragraph>
            ) : (
              <>
                <FontAwesome name="star" color="#ff385c" />
                <Paragraph style={styles.ratingCount}>
                  {rating === 0 ? 'New' : rating}
                </Paragraph>
                <Paragraph>{reviews.length}</Paragraph>
              </>
            )}
          </View>
          <View style={styles.titleContainer}>
            <Title style={styles.title}>
              Entire {category} · {city}
            </Title>
          </View>
          <View style={styles.subTitleContainer}>
            <Title style={styles.title}>{title}</Title>
          </View>
          <View style={styles.priceContainer}>
            <Paragraph style={styles.priceText}>${price}</Paragraph>
            <Paragraph> / night</Paragraph>
          </View>
        </View>
      </TouchableOpacity>
    </NativeViewGestureHandler>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    //paddingHorizontal: 20,
    marginHorizontal: 25,
    //  padding: 10,
  },

  container: {
    display: 'flex',
    alignItems: 'center',
  },

  listingDetails: {
    marginTop: 10,
    marginBottom: 20,
  },

  imagesList: {
    height: height / 3,
    width: width,
  },

  image: {
    borderRadius: 15,
    //overflow: 'hidden',
    height: '100%',
    width: width,
  },

  norev: {
    color: Colors.grey600,
  },

  priceContainer: {
    flexDirection: 'row',
  },

  priceText: {
    fontWeight: 'bold',
  },

  ratingCount: {
    marginLeft: 5,
  },

  reviewsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleContainer: {
    color: Colors.grey600,
    marginTop: 1,
  },

  subTitleContainer: {
    color: Colors.grey600,
    marginTop: -3,
  },

  title: {fontSize: 16, fontWeight: '600'},
});
