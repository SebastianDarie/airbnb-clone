import {TouchableHighlight} from '@gorhom/bottom-sheet';
import {ListingReview} from '@second-gear/controller';
import dayjs from 'dayjs';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Swipeable} from 'react-native-gesture-handler';
import {Caption, Colors, Paragraph, Subheading} from 'react-native-paper';

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
        <Swipeable>
          <TouchableHighlight underlayColor={Colors.grey300}>
            <View style={styles.cardContentContainer}>
              <FastImage
                source={{uri: item?.creator.photoUrl}}
                style={styles.cardImage}
              />
              <View style={styles.textContainer}>
                <View style={styles.firstLine}>
                  <Subheading>{item?.creator.name}</Subheading>
                </View>
                <Caption numberOfLines={1}>
                  {dayjs(item?.createdAt).format('MMM-YYYY')}
                </Caption>
              </View>
            </View>
          </TouchableHighlight>
        </Swipeable>
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

  cardContentContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },

  cardImage: {
    backgroundColor: Colors.grey300,
    borderRadius: 17,
    marginRight: 10,
    height: 34,
    width: 34,
  },

  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
