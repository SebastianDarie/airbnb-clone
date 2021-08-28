import {ListingReview, useListingQuery} from '@second-gear/controller';
import React, {useCallback, useState} from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {UnderlineBtn} from '../../components/button/UnderlineBtn';
import {RoomHeader} from '../../components/header/RoomHeader';
import {Amenity} from '../../components/iconlabel/Amenity';
import {Highlight} from '../../components/iconlabel/Highlight';
import {ReviewCard} from '../../components/card/ReviewCard';
import {ImgCarousel} from '../../components/room/ImgCarousel';
import {UserCard} from '../../components/card/UserCard';
import {amenityIcons} from '../../constants/amenityIcons';

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
  const scaleValue = new Animated.Value(0);
  const [headerOpacity] = useState(opacityValue);
  const inputRange = [0, 1];
  const outputRange = [1, 0.9];
  const scale = scaleValue.interpolate({inputRange, outputRange});

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

  const onPressIn = () => {
    Animated.spring(scaleValue, {toValue: 1, useNativeDriver: true}).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {toValue: 0, useNativeDriver: true}).start();
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
          key={data.listing.id}
          style={styles.scrollContainer}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}>
          <ImgCarousel photos={data.listing.photos} />

          <View style={styles.mainWrapper}>
            <Title style={styles.roomTitle}>{data.listing.title}</Title>
            <View style={styles.subheading}>
              <View style={styles.iconContainer}>
                <FontAwesomeIcon name="star" size={17} style={styles.icon} />
                <Subheading style={styles.city}>{finalRating}</Subheading>
                <Subheading style={styles.city}>
                  {data.listing.reviews?.length
                    ? `(${data.listing.reviews.length} reviews)`
                    : null}
                </Subheading>
              </View>
              <Subheading style={styles.city}>{data.listing.city}</Subheading>
            </View>

            <Divider />

            <View style={styles.section}>
              <Highlight
                ant
                caption="You'll have the entire apartment to yourself."
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
              <Paragraph>{data.listing.description}</Paragraph>
              <TouchableOpacity>
                <View style={styles.showMoreContainer}>
                  <Text style={styles.showMore}>Show More</Text>
                  <FeatherIcon
                    name="chevron-right"
                    color={Colors.black}
                    size={18}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{marginTop: 4}}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <Divider />

            <View style={styles.section}>
              <Text style={styles.amenitiesTitle}>What this place offers</Text>
              {data.listing.amenities.map(a => (
                <Amenity
                  amenity={a}
                  name={amenityIcons[a.replace(/\s+/g, '') as 'Wifi']}
                />
              ))}
            </View>

            <Divider />

            <View style={styles.section}>
              <Text style={styles.amenitiesTitle}>Where you'll be</Text>
              <MapView
                initialRegion={{
                  latitude: data.listing.latitude,
                  longitude: data.listing.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
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
            <View style={styles.reviewsMargin}>
              <UserCard
                name={data.listing.creator.name}
                joinDate={data.listing.creator.createdAt}
                photoUrl={data.listing.creator.photoUrl}
              />
            </View>
          </View>
        </ScrollView>
      )}

      <View style={styles.reserve}>
        <View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${data?.listing?.price}</Text>
            <Text style={styles.night}> / night</Text>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesomeIcon name="star" size={14} style={styles.icon} />
            <Subheading style={styles.reserveRating}>{finalRating}</Subheading>
          </View>
        </View>

        <Animated.View style={[styles.btnContainer, {transform: [{scale}]}]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.reserveBtn}
            onPressIn={onPressIn}
            onPressOut={onPressOut}>
            <Text style={styles.reserveText}>Check availability</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  amenitiesTitle: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: '700',
  },

  btnContainer: {
    backgroundColor: '#ff385c',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 45,
    width: '45%',
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  city: {
    color: Colors.grey500,
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: Colors.grey500,
  },

  icon: {color: '#ff385c', marginTop: 2, marginRight: 5},

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

  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  night: {
    fontSize: 16,
  },

  reserve: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.grey200,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  reserveBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reserveText: {
    color: Colors.white,
    fontSize: 16,
  },

  reserveRating: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  reviewsMargin: {
    marginLeft: 20,
  },

  roomTitle: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
  },

  scrollContainer: {
    flex: 1,
  },

  section: {
    paddingVertical: 18,
  },

  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  showMore: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  subheading: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 15,
  },
});
