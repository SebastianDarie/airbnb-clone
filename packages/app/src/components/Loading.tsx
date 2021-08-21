import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const image = require('../assets/loading.gif');

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {flex: 1, justifyContent: 'center'},
});
