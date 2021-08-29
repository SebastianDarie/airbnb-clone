import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {ListingReview} from '@second-gear/controller';
import React from 'react';
import {IconButton} from 'react-native-paper';
import {BottomNavigator, TabParamList} from './mainNavigator/BottomNavigator';
import {ListingsPage} from './mainNavigator/bottomNavigator/ListingsPage';
import {CalendarPage} from './mainNavigator/CalendarPage';
import {DescriptionPage} from './mainNavigator/DescriptionPage';
import {GuestsPage} from './mainNavigator/GuestsPage';
import {ReviewsPage} from './mainNavigator/ReviewsPage';
import {RoomPage} from './mainNavigator/RoomPage';
import {SearchPage} from './mainNavigator/SearchPage';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Calendar: undefined;
  Description: {description: string | undefined};
  Guests: undefined;
  Home: NavigatorScreenParams<TabParamList>;
  //Listings: undefined;
  Reviews: {reviews: ListingReview[] | undefined | null};
  Room: {roomId: string};
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
          //gestureDirection: 'horizontal',
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
          name="Description"
          component={DescriptionPage}
          // options={{
          //   animation: 'slide_from_bottom',
          //   presentation: 'fullScreenModal',
          // }}
        />
        <Stack.Screen
          name="Guests"
          component={GuestsPage}
          options={{
            animation: 'slide_from_right',
            presentation: 'card',
          }}
        />
        {/* <Stack.Screen
          name="Listings"
          component={ListingsPage}
          options={{
            headerShown: true,
            headerRight: () => (
              <IconButton icon="filter-variant" color="black" />
            ),
          }}
        /> */}
        <Stack.Screen
          name="Reviews"
          component={ReviewsPage}
          options={{
            animation: 'slide_from_bottom',
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Room"
          component={RoomPage}
          //options={{animation: 'fade'}}
        />
      </Stack.Navigator>
    </>
  );
};
