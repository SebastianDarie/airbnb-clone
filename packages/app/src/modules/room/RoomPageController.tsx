import React, {useState} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  Caption,
  Colors,
  Divider,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';
//import Animated from 'react-native-reanimated';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {RoomScreenNavigationProp} from '../../navigation/RootNavigation';

export const RoomPageController: React.FC<RoomScreenNavigationProp> = ({
  route,
}) => {
  const opacityValue = new Animated.Value(0);
  const [headerOpacity, setHeaderOpacity] = useState(opacityValue);
  console.log(route.params.roomId);

  const headerStyle: Animated.AnimateStyle<StyleProp<ViewStyle>> = {
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

  return (
    <View style={styles.container}>
      <View style={styles.overlayBtn}>
        <Animated.View style={headerStyle} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <View style={styles.mainWrapper}>
          <Title>title</Title>
          <View style={styles.subheading}>
            <View style={styles.iconContainer}>
              <FontAwesome5Icon name="star" style={styles.icon} />
              <Subheading>rating</Subheading>
              <Subheading>number of reviews</Subheading>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name="medal" />
              <Subheading>superhost</Subheading>
            </View>
            <Subheading>city</Subheading>
          </View>

          <Divider />

          <View style={styles.section}>
            <View>
              <View style={styles.highlight}>
                <EvilIcon name="spinner" color={Colors.black} size={34} />
                <View style={styles.highlightText}>
                  <Text>
                    <Paragraph>Enhanced Clean</Paragraph>
                    <Caption>
                      This host commited to Airbnb's 5-step enhanced cleaning
                      process
                    </Caption>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  highlight: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  highlightText: {
    flexShrink: 1,
    marginLeft: 10,
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

  mainWrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  overlayBtn: {
    zIndex: 100,
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
