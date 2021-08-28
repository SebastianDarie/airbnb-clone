import {TouchableHighlight} from '@gorhom/bottom-sheet';
import {ListingReview} from '@second-gear/controller';
import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Swipeable} from 'react-native-gesture-handler';
import {Caption, Colors, Subheading} from 'react-native-paper';

interface UserCardProps {
  item?: ListingReview;
  name?: string;
  joinDate?: string;
  photoUrl?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  item,
  joinDate,
  name,
  photoUrl,
}) => {
  return (
    <Swipeable>
      <TouchableHighlight>
        <View style={styles.cardContentContainer}>
          <FastImage
            source={{uri: item ? item.creator.photoUrl : photoUrl}}
            style={styles.cardImage}
          />
          <View style={styles.textContainer}>
            <View style={styles.firstLine}>
              <Subheading>{item ? item.creator.name : name}</Subheading>
            </View>
            <Caption numberOfLines={1}>
              {item
                ? dayjs(+item.createdAt).format('MMM YYYY')
                : dayjs(+joinDate!).format('MMM YYYY')}
            </Caption>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
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
