import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from 'react-native-paper';
import {animateMove, getNextState} from '../lib/drawerUtils';

interface BottomDrawerProps {
  children?: React.ReactNode;
  onDrawerStateChange?: (nextState: DrawerState) => void;
}

const {height} = Dimensions.get('window');
export enum DrawerState {
  Open = height - 230,
  Peek = 230,
  Closed = 0,
}

export const BottomDrawer: React.FC<BottomDrawerProps> = ({
  onDrawerStateChange,
  children,
}) => {
  const y = useRef(new Animated.Value(DrawerState.Closed)).current;
  const state = useRef(new Animated.Value(DrawerState.Closed)).current;
  const margin = 0.05 * height;
  const movementVal = (moveY: number) => height - moveY;

  const onPanResponderMove = (
    _: GestureResponderEvent,
    {moveY}: PanResponderGestureState,
  ) => {
    const val = movementVal(moveY);
    animateMove(y, val);
  };

  const onPanResponderRelease = (
    _: GestureResponderEvent,
    {moveY}: PanResponderGestureState,
  ) => {
    const valueToMove = movementVal(moveY);
    // @ts-ignore
    const nextState = getNextState(state._value, valueToMove, margin);
    state.setValue(nextState);
    animateMove(y, nextState);
  };

  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    {dy}: PanResponderGestureState,
  ) => Math.abs(dy) >= 10;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.animatedContainer, {transform: [{translateY: y}]}]}
      {...panResponder.panHandlers}>
      <View style={styles.divider} />
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    backgroundColor: Colors.white,
    borderRadius: 25,
    bottom: -height + 30,
    height: height,
    width: '100%',
  },

  divider: {
    backgroundColor: Colors.grey300,
    marginTop: 25,
    marginBottom: 15,
    height: 1,
    width: '100%',
  },
});
