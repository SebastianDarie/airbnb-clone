import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  LongPressGestureHandlerProps,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface ScaleButtonProps {
  activeScale?: number;
  handlerProps?: LongPressGestureHandlerProps;
  springConfig?: Animated.WithSpringConfig | undefined;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const ScaleButton: React.FC<ScaleButtonProps> = ({
  children,
  activeScale = 0.9,
  handlerProps,
  springConfig = {damping: 10, mass: 1, stiffness: 200},
  style,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scale.value, springConfig)}],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = activeScale;
    },
    onCancel: () => {
      scale.value = 1;
    },
    onEnd: () => {
      if (onPress) {
        onPress();
      }
      scale.value = 1;
    },
  });

  const onLongPress = (
    e: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>,
  ) => {
    const s = e.nativeEvent.state;
    switch (s) {
      case State.ACTIVE:
      case State.BEGAN:
        return scale.value === activeScale;

      case State.CANCELLED:
        return (scale.value = 1);

      case State.END:
        onPress?.();
        return (scale.value = 1);

      default:
        break;
    }
    console.log('longpress');
    // if (s === State.ACTIVE || s === State.BEGAN) {
    //   scale.value = activeScale;
    // } else if (s === State.CANCELLED) {
    //   scale.value = 1;
    // }
  };

  return (
    <LongPressGestureHandler
      minDurationMs={0.5}
      maxDist={10}
      {...handlerProps}
      onHandlerStateChange={onLongPress}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </LongPressGestureHandler>
  );
};
