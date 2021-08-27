import {ListingReview, useListingQuery} from '@second-gear/controller';
import React, {useCallback, useState} from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {
  Colors,
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
//import Animated from 'react-native-reanimated';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GradientButton} from '../../components/button/GradientBtn';
import {UnderlineBtn} from '../../components/button/UnderlineBtn';
import {RoomHeader} from '../../components/header/RoomHeader';
import {Amenity} from '../../components/iconlabel/Amenity';
import {Highlight} from '../../components/iconlabel/Highlight';
import {ReviewCard} from '../../components/ReviewCard';

interface RoomPageControllerProps {
  id: string;
  onClose: () => void;
}

const {width} = Dimensions.get('window');

export const RoomPageController: React.FC<RoomPageControllerProps> = ({
  id,
  onClose,
}) => {
  const {data, loading} = useListingQuery({
    variables: {id, noreviews: false, slim: false},
  });
  const opacityValue = new Animated.Value(0);
  const [headerOpacity] = useState(opacityValue);
  //console.log(route.params.roomId);

  const headerStyle: Animated.WithAnimatedObject<ViewStyle> = {
    height: 70,
    width: '100%',
    backgroundColor: Colors.white,
    opacity: headerOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;

    if (scrollPosition > 70) {
      Animated.timing(headerOpacity, {
        duration: 50,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerOpacity, {
        duration: 0,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderReview = useCallback(
    ({item, index}: {item: ListingReview; index: number}) => (
      <ReviewCard item={item} index={index} />
    ),
    [],
  );

  let rating = 0;
  if (data?.listing?.reviews?.length) {
    for (let i = 0; i < data.listing.reviews.length; i++) {
      rating += data.listing.reviews[i].rating;
    }
  }
  const finalRating =
    rating === 0
      ? 'New'
      : (rating / data?.listing?.reviews?.length!).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.overlayBtn}>
        <Animated.View style={headerStyle} />
        <RoomHeader onPress={onClose} />
      </View>

      {data?.listing && (
        <ScrollView
          style={styles.scrollContainer}
          scrollEventThrottle={16}
          onScroll={handleScroll}>
          <View style={styles.mainWrapper}>
            <Title>{data.listing.title}</Title>
            <View style={styles.subheading}>
              <View style={styles.iconContainer}>
                <FontAwesome5Icon name="star" style={styles.icon} />
                <Subheading>{finalRating}</Subheading>
                <Subheading>
                  {data.listing.reviews?.length
                    ? `(${data.listing.reviews.length})`
                    : null}
                </Subheading>
              </View>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcon name="medal" />
                <Subheading>superhost</Subheading>
              </View>
              <Subheading>{data.listing.city}</Subheading>
            </View>

            <Divider />

            <View style={styles.section}>
              <Highlight
                ant
                caption="You'll have the entire apartment to yourself"
                name="home"
                title="Entire home"
              />
              <Highlight
                ant={false}
                caption="This host commited to Airbnb's 5-step enhanced cleaning
              process."
                name="star-four-points-outline"
                title="Enhanced Clean"
              />
              <Highlight
                ant={false}
                caption="Check yourself in with the lockbox."
                name="door"
                title="Self check-in"
              />
            </View>

            <Divider />

            <View style={styles.section}>
              <Headline>Description</Headline>
              <View style={styles.iconsFlex}>
                <View style={styles.iconContainer}>
                  <FontAwesome5Icon name="bath" style={styles.icon} />
                  <Subheading>Baths</Subheading>
                  <Subheading>{data.listing.bathrooms}</Subheading>
                </View>
                <View style={styles.iconContainer}>
                  <FontAwesome5Icon name="bed" style={styles.icon} />
                  <Subheading>Beds</Subheading>
                  <Subheading>{data.listing.beds}</Subheading>
                </View>
              </View>
              <Paragraph>{data.listing.description}</Paragraph>
            </View>

            <Divider />

            <View style={styles.section}>
              <Headline>What this place offers</Headline>
              {data.listing.amenities.map(a => (
                <Amenity amenity={a} name="elevator" />
              ))}
            </View>

            <Divider />

            <View style={styles.section}>
              <Headline>Location</Headline>
              <MapView
                initialRegion={{
                  latitude: data.listing.latitude,
                  longitude: data.listing.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
                scrollEnabled={false}
                style={styles.map}>
                <Marker
                  coordinate={{
                    latitude: data.listing.latitude,
                    longitude: data.listing.longitude,
                  }}
                />
              </MapView>
            </View>

            <Divider />
          </View>

          <View style={styles.section}>
            <View style={styles.reviewsMargin}>
              <Headline>Reviews</Headline>
            </View>

            {data.listing.reviews && (
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
                onPress={() => console.log('reviews')}
              />
            </View>
          </View>

          <Divider />

          <View style={styles.section}>
            <View style={styles.reviewsMargin}></View>
          </View>
        </ScrollView>
      )}

      <View style={styles.reserve}>
        <View>
          <View style={styles.priceContainer}>
            <Title>${data?.listing?.price}</Title>
            <Paragraph> / night</Paragraph>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome5Icon name="star" style={styles.icon} />
            <Subheading>{finalRating}</Subheading>
            <Subheading>
              {data?.listing?.reviews?.length
                ? `(${data.listing.reviews.length})`
                : null}
            </Subheading>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <GradientButton
            disabled={false}
            text="Reserve"
            onPress={() => console.log('Reserve')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '50%',
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  icon: {
    color: '#ff385c',
    marginRight: 2,
  },

  iconsFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    marginRight: 16,
  },

  mainWrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  map: {
    height: 200,
    marginTop: 15,
  },

  overlayBtn: {
    zIndex: 100,
  },

  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  reserve: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.grey200,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  reviewsMargin: {
    marginLeft: 20,
  },

  scrollContainer: {
    flex: 1,
  },

  section: {
    paddingVertical: 18,
  },

  subheading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
});
