import {Review} from '@second-gear/controller';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Paragraph, Title} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ListingCardProps {
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
    <Pressable onPress={onPress}>
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
          <FontAwesome name="star" color="#ff385c" />
          <Paragraph>{rating === 0 ? 'New' : rating}</Paragraph>
          {reviews.length > 0 ? <Paragraph>{reviews.length}</Paragraph> : null}
        </View>
        <View style={styles.titleContainer}>
          <Title style={styles.title}>{title}</Title>
        </View>

        <Paragraph>${price}</Paragraph>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    height: '100%',
    width: width,
  },

  reviewsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleContainer: {
    marginVertical: 3,
  },

  title: {fontWeight: 'bold'},
});
