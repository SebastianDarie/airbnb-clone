import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MainPage} from './MainPage';
const Tab = createBottomTabNavigator();

export const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#ff385d'}}>
      <Tab.Screen
        name="Explore"
        component={MainPage}
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
