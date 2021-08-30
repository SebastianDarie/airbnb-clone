import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {PeriodMarking} from 'react-native-calendars';
import {RootStackParamList} from '../navigation/MainNavigator';
import {GradientButton} from './button/GradientBtn';
import {NavigatorScreenParams} from '@react-navigation/native';
import {TabParamList} from '../navigation/mainNavigator/BottomNavigator';

interface SearchActionsProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
  route: keyof RootStackParamList;
  params?: NavigatorScreenParams<TabParamList>;
  disabled: boolean;
  text?: string;
  onPress: () => void;
  setMarkedDates?: (
    value: React.SetStateAction<{
      [date: string]: PeriodMarking;
    }>,
  ) => void;
}

export const SearchActions: React.FC<SearchActionsProps> = ({
  navigation,
  route,
  params,
  disabled,
  text,
  onPress,
  setMarkedDates,
}) => {
  return (
    <View style={styles.calendarActions}>
      <View>
        <Pressable
          onPress={() => {
            if (disabled) {
              navigation.navigate(route, params);
            } else if (setMarkedDates) {
              setMarkedDates({});
            }
          }}>
          <Text style={styles.textBtn}>{disabled ? 'Skip' : 'Clear'}</Text>
        </Pressable>
      </View>
      <GradientButton disabled={disabled} text={text} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarActions: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.grey400,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  textBtn: {
    color: Colors.black,
    fontWeight: 'bold',
    letterSpacing: 0.75,
    textDecorationLine: 'underline',
  },
});
