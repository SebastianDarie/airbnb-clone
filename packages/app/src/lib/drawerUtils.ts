import {Animated} from 'react-native';
import {DrawerState} from '../components/BottomDrawer';

export const animateMove = (
  y: Animated.Value,
  toValue: number | Animated.Value,
  callback?: () => void,
) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start(finished => finished && callback && callback());
};

export const getNextState = (
  currentState: DrawerState,
  val: number,
  margin: number,
): DrawerState => {
  switch (currentState) {
    case DrawerState.Peek:
      return val >= currentState + margin
        ? DrawerState.Open
        : val <= DrawerState.Peek - margin
        ? DrawerState.Closed
        : DrawerState.Peek;

    case DrawerState.Open:
      return val >= currentState
        ? DrawerState.Open
        : val <= DrawerState.Peek
        ? DrawerState.Closed
        : DrawerState.Peek;

    case DrawerState.Open:
      return val >= currentState + margin
        ? val <= DrawerState.Peek + margin
          ? DrawerState.Peek
          : DrawerState.Open
        : DrawerState.Peek;
    default:
      return currentState;
  }
};
