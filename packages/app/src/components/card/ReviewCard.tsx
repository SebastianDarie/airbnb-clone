import {ListingReview} from '@second-gear/controller';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Colors, Paragraph} from 'react-native-paper';
import {UserCard} from './UserCard';

interface ReviewCardProps {
  item: ListingReview;
  index: number;
}

const {width} = Dimensions.get('window');

export const ReviewCard: React.FC<ReviewCardProps> = ({item, index}) => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: width - 100,
        margin: index === 0 ? '5px 5px 5px 20px' : 5,
      }}>
      <View style={styles.cardContainer}>
        <UserCard item={item} />
        <Paragraph numberOfLines={5}>{item?.review}</Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey300,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    height: 240,
    width: '100%',
  },
});
