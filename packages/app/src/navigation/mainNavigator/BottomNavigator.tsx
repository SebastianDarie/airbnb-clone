import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {IconButton} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {ListingsPage} from './bottomNavigator/ListingsPage';
import {MainPage} from './bottomNavigator/MainPage';

export type ExploreStackParamList = {
  Listings: undefined;
  Main: undefined;
};

//const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const ExploreStack = createStackNavigator<ExploreStackParamList>();

const ExploreStackScreen: React.FC = () => {
  return (
    <ExploreStack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <ExploreStack.Screen name="Main" component={MainPage} />
      <ExploreStack.Screen
        name="Listings"
        component={ListingsPage}
        options={{
          headerShown: true,
          headerTransparent: true,
          // headerLeft: () => (
          //   <IconButton icon="arrow-left" color="black" size={20} />
          // ),
          //headerRight: () => <IconButton icon="filter-variant" color="black" />,
        }}
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
        headerShown: false,
        tabBarActiveTintColor: '#ff385d',
      }}>
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        // listeners={({navigation, route}) => ({
        //   tabPress: e => {
        //     if (route.name === 'Explore') {
        //       e.preventDefault();
        //     }
        //   },
        // })}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicon name="md-search-outline" color={color} size={size} />
          ),
        }}
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
