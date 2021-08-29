import {ListingReview} from '@second-gear/controller';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {UserCard} from '../../components/card/UserCard';
import {ReviewsScreenNavigationProp} from '../../navigation/RootNavigation';

export const ReviewsController: React.FC<ReviewsScreenNavigationProp> = ({
  route,
}) => {
  const renderItem = useCallback(
    ({item}: {item: ListingReview}) => (
      <View>
        <UserCard item={item} />
        <Text style={styles.reviewText}>{item?.review}</Text>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={route.params.reviews}
        keyExtractor={item => item?.id || 'key'}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlistPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  flatlistPadding: {
    padding: 20,
  },

  reviewText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22,
  },
});
