import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';

interface GradientBtnProps {
  disabled?: boolean;
  text?: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

export const GradientButton: React.FC<GradientBtnProps> = ({
  disabled,
  text,
  onPress,
}) => {
  return (
    <Pressable
      android_ripple={{
        borderless: true,
        color: 'rgb(227, 28, 95)',
        radius: 15,
      }}
      disabled={disabled}
      onPress={onPress}>
      {!disabled ? (
        <LinearGradient
          colors={['rgb(230, 30, 77)', 'rgb(227, 28, 95)', 'rgb(215, 4, 102)']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      ) : (
        <Button mode="contained" disabled={true}>
          {text ?? 'Continue'}
        </Button>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
  },

  linearGradient: {
    borderRadius: 5,
    paddingHorizontal: 15,
  },
});
