import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from 'react-native-paper';

interface ListingCarouselItemProps {
  beds: number;
  bedrooms: number;
  category: string;
  cover: string;
  price: number;
  title: string;
  onPress: () => void;
}

const {width} = Dimensions.get('window');

export const ListingCarouselItem: React.FC<ListingCarouselItemProps> = ({
  bedrooms,
  beds,
  category,
  cover,
  price,
  title,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: width - 20,
        },
      ]}
      onPress={onPress}>
      <View style={styles.innerContainer}>
        <FastImage
          source={{uri: cover}}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.bedrooms}>
            {beds} beds · {bedrooms} bedrooms
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            Entire {category} · {title}
          </Text>

          <Text style={styles.prices}>
            <Text style={styles.price}>${price}</Text> / night
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },

  image: {
    height: '100%',
    aspectRatio: 1,
  },

  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },

  bedrooms: {
    marginVertical: 10,
    color: Colors.grey700,
  },

  description: {
    fontSize: 15,
  },

  prices: {
    fontSize: 16,
    marginVertical: 10,
  },

  price: {
    fontWeight: 'bold',
  },
});
