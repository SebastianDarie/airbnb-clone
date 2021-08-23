import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MainPage} from './MainPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchPage} from './bottomNavigator/SearchPage';
import {
  getFocusedRouteNameFromRoute,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {CalendarPage} from './bottomNavigator/CalendarPage';
import {GuestsPage} from './GuestsPage';

export type ExploreStackParamList = {
  Calendar: undefined;
  Guests: undefined;
  Main: undefined;
  Search: undefined;
};

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

const ExploreStackScreen: React.FC = () => {
  return (
    <ExploreStack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <ExploreStack.Screen name="Main" component={MainPage} />
      <ExploreStack.Screen
        name="Search"
        component={SearchPage}
        options={{
          presentation: 'modal',
        }}
      />
      <ExploreStack.Screen
        name="Calendar"
        component={CalendarPage}
        options={{presentation: 'card'}}
      />
      <ExploreStack.Screen
        name="Guests"
        component={GuestsPage}
        options={{presentation: 'card'}}
      />
    </ExploreStack.Navigator>
  );
};

export type TabParamList = {
  Explore: NavigatorScreenParams<ExploreStackParamList>;
  Wishlists: undefined;
  Trips: undefined;
  Inbox: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: '#ff385d',
      }}>
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicon name="md-search-outline" color={color} size={size} />
          ),
          tabBarStyle: (_r => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';

            if (routeName === 'Search') {
              return {display: 'none'};
            }
          })(route),
        })}
      />
      <Tab.Screen
        name="Wishlists"
        component={MainPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicon name="md-heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={'Trips'}
        component={MainPage}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="airbnb" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={'Inbox'}
        component={MainPage}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="message-square" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={MainPage}
        options={{
          tabBarIcon: ({color}) => (
            <EvilIcons name="user" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
