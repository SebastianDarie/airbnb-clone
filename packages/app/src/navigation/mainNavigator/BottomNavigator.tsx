import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MainPage} from './MainPage';
import LinearGradient from 'react-native-linear-gradient';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchPage} from './bottomNavigator/SearchPage';
const Tab = createBottomTabNavigator();

export type ExploreStackParamList = {
  Main: undefined;
  Search: undefined;
};

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

const ExploreStackScreen: React.FC = () => {
  return (
    <ExploreStack.Navigator screenOptions={{headerShown: false}}>
      <ExploreStack.Screen name="Main" component={MainPage} />
      <ExploreStack.Screen
        name="Search"
        component={SearchPage}
        options={{presentation: 'modal'}}
      />
    </ExploreStack.Navigator>
  );
};

export const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ff385d',
      }}>
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          // headerBackground: () => (
          //   <LinearGradient
          //     start={{x: 0, y: 0}}
          //     end={{x: 1, y: 0}}
          //     colors={['#5b49a4', '#8e4a99', '#bd487f', '#d44a76']}
          //   />
          // ),
          headerShown: false,
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
