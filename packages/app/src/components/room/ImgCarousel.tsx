import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

interface ImgCarouselProps {
  photos: string[];
}

const {height, width} = Dimensions.get('window');

export const ImgCarousel: React.FC<ImgCarouselProps> = ({photos}) => {
  const renderItem = useCallback(
    ({item}: {item: string}) => (
      <View>
        <FastImage source={{uri: item}} resizeMode="cover" style={styles.img} />
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(_item, index) => 'key' + index}
        renderItem={renderItem}
        decelerationRate="fast"
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    height: height / 3,
    width: width,
  },

  img: {
    height: '100%',
    width: width,
  },
});
