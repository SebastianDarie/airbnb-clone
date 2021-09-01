import {useNavigation} from '@react-navigation/native';
import {useListingQuery} from '@second-gear/controller';
import React, {useState} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {Colors, Divider, Subheading, Title} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {UserCard} from '../../components/card/UserCard';
import {RoomHeader} from '../../components/header/RoomHeader';
import {Amenity} from '../../components/iconlabel/Amenity';
import {Highlight} from '../../components/iconlabel/Highlight';
import {ImgCarousel} from '../../components/room/ImgCarousel';
import {amenityIcons} from '../../constants/amenityIcons';
import {DescriptionSection} from './DescriptionSection';
import {ReviewsSection} from './ReviewsSection';
import {styles} from './styles';

interface RoomPageControllerProps {
  id: string;
  onClose: () => void;
}

export const RoomPageController: React.FC<RoomPageControllerProps> = ({
  id,
  onClose,
}) => {
  const navigation = useNavigation();
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
        <Animated.View key="fade-header" style={headerStyle} />
        <RoomHeader onPress={onClose} />
      </View>

      {data?.listing && (
        <ScrollView
          key={data.listing.id}
          style={styles.scrollContainer}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}>
          <View>
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

              <DescriptionSection data={data} />

              <Divider />

              <View style={styles.section}>
                <Text style={styles.amenitiesTitle}>
                  What this place offers
                </Text>
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

            <ReviewsSection data={data} navigation={navigation} />

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

        <Animated.View
          key="scale-btn"
          style={[styles.btnContainer, {transform: [{scale}]}]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.reserveBtn}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => navigation.navigate('Reserve', {data})}>
            <Text style={styles.reserveText}>Check availability</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};
