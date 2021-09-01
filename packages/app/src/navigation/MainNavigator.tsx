import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ListingQuery, ListingReview} from '@second-gear/controller';
import React from 'react';
import {BottomNavigator, TabParamList} from './mainNavigator/BottomNavigator';
import {CalendarPage} from './mainNavigator/CalendarPage';
import {GuestsPage} from './mainNavigator/GuestsPage';
import {ReservePage} from './mainNavigator/ReservePage';
import {ReviewsPage} from './mainNavigator/ReviewsPage';
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
  Reserve: {data: ListingQuery | undefined};
  Reviews: {reviews: ListingReview[] | undefined | null};
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
//const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
        }}>
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
          options={{
            animation: 'slide_from_right',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="Guests"
          component={GuestsPage}
          options={{
            animation: 'slide_from_right',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="Reserve"
          component={ReservePage}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            headerTitle: 'Request to book',
          }}
        />
        <Stack.Screen
          name="Reviews"
          component={ReviewsPage}
          options={{
            animation: 'slide_from_bottom',
            headerShown: true,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </>
  );
};
