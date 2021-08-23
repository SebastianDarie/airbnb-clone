import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native-paper';

interface GradientWrapperProps {}

export const GradientWrapper: React.FC<GradientWrapperProps> = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#4b47a1', '#8e4a99', '#bd487f', '#d44a76']}
      style={styles.linearGradient}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.gradientOverlay}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  gradientOverlay: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 40,
  },
});
