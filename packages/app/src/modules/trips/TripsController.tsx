import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
  debug,
  Easing,
  Extrapolate,
  interpolate,
  set,
  startClock,
  stopClock,
  timing,
  useAnimatedGestureHandler,
  useCode,
  useSharedValue,
  Value,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TripsScreenNavigationProp} from '../../navigation/RootNavigation';

// interface TripsControllerProps {

// }

type AnimatedGHContext = {
  val: number;
};

const runTiming = (clock: Animated.Clock, from: number, to: number) => {
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(from),
    time: new Value(0),
    frameTime: new Value(0),
  };

  // const config: Animated.TimingConfig = {
  //   duration: 100,
  //   toValue: new Value(to),
  //   easing: 0,
  // };

  //timing(clock, state, config)

  return block([
    cond(clockRunning(clock), [], startClock(clock)),
    withTiming(to, {duration: 100, easing: Easing.inOut(Easing.ease)}),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
};

export const TripsController: React.FC<TripsScreenNavigationProp> = ({}) => {
  // const scaleValue = new Animated.Value(0);
  // const inputRange = [0, 1];
  // const outputRange = [1, 0.9];
  // const scale = scaleValue.interpolate({inputRange, outputRange});

  // const onPressIn = () => {
  //   Animated.spring(scaleValue, {toValue: 1}).start();
  // };

  // const onPressOut = () => {
  //   Animated.spring(scaleValue, {toValue: 0}).start();
  // };

  // const scaleValue = useSharedValue(0);

  // const gestureHandler = useAnimatedGestureHandler<
  //   PanGestureHandlerGestureEvent,
  //   AnimatedGHContext
  // >({
  //   onStart: (_, ctx) => {
  //     ctx.val = scaleValue.value;
  //   },
  //   onActive: (e, ctx) => {
  //     scaleValue.value = ctx.val + e.translationX;
  //   },
  // });

  const [pressed, setPressed] = useState<boolean>(false);

  const sharedScale = useSharedValue(1);

  const {clock, scale} = useMemo(
    () => ({
      clock: new Clock(),
      scale: new Value(1),
    }),
    [],
  );

  useCode(
    () =>
      block([
        pressed
          ? set(scale, runTiming(clock, 0, 1))
          : set(scale, runTiming(clock, 1, 0)),
      ]),
    [pressed],
  );

  const scaling: Animated.Adaptable<number> = interpolate(
    sharedScale.value,
    [0, 1],
    [1, 0.9],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Trips</Text>
        <View style={styles.divider} />
        <View>
          <Text style={styles.helloTitle}>Say hello to the world again</Text>
          <Text style={styles.planParagraph}>
            Plan a new trip and explore places to stay close to all the places
            you love.
          </Text>
          <TouchableWithoutFeedback
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}>
            <Animated.View
              style={{transform: [{scaleX: scaling}, {scaleY: scaling}]}}>
              <Text>Start exploring</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  divider: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 1,
    width: '100%',
  },

  helloTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    lineHeight: 26,
    marginTop: 40,
    marginBottom: 5,
  },

  planParagraph: {
    fontSize: 15,
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  scrollView: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
