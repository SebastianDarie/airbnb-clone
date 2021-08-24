import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BottomNavigator, TabParamList} from './mainNavigator/BottomNavigator';
import {CalendarPage} from './mainNavigator/CalendarPage';
import {GuestsPage} from './mainNavigator/GuestsPage';
import {RoomPage} from './mainNavigator/RoomPage';
import {SearchPage} from './mainNavigator/SearchPage';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Calendar: undefined;
  Guests: undefined;
  Home: NavigatorScreenParams<TabParamList>;
  Room: {roomId: string};
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{
            animation: 'flip',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarPage}
          options={{animation: 'slide_from_right', presentation: 'card'}}
        />
        <Stack.Screen
          name="Guests"
          component={GuestsPage}
          options={{animation: 'slide_from_right', presentation: 'card'}}
        />
        <Stack.Screen
          name="Room"
          component={RoomPage}
          options={{animation: 'fade'}}
        />
      </Stack.Navigator>
    </>
  );
};
