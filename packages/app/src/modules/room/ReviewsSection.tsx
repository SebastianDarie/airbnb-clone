import {NavigationProp} from '@react-navigation/native';
import {ListingQuery, ListingReview} from '@second-gear/controller';
import React, {useCallback} from 'react';
import {Dimensions, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Headline} from 'react-native-paper';
import {UnderlineBtn} from '../../components/button/UnderlineBtn';
import {ReviewCard} from '../../components/card/ReviewCard';
import {styles} from './styles';

interface ReviewsSectionProps {
  data: ListingQuery;
  navigation: NavigationProp<
    ReactNavigation.RootParamList,
    keyof ReactNavigation.RootParamList
  >;
}

const {width} = Dimensions.get('window');

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  data,
  navigation,
}) => {
  const renderReview = useCallback(
    ({item, index}: {item: ListingReview; index: number}) => (
      <ReviewCard item={item} index={index} />
    ),
    [],
  );

  return (
    <View style={styles.section}>
      <View style={styles.reviewsMargin}>
        <Headline>Reviews</Headline>
      </View>

      {data?.listing?.reviews && (
        <FlatList
          data={data.listing.reviews.slice(0, 4)}
          keyExtractor={item => item.id}
          renderItem={renderReview}
          decelerationRate={0}
          snapToAlignment="center"
          snapToInterval={width - 90}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
        />
      )}
      <View style={styles.reviewsMargin}>
        <UnderlineBtn
          text="See more"
          onPress={() =>
            navigation.navigate('Reviews', {
              reviews: data.listing?.reviews,
            })
          }
        />
      </View>
    </View>
  );
};
