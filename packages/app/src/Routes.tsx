import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RegisterConnector} from './modules/auth/RegisterConnector';
import {AuthParamList} from './navigation/AuthParamList';

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          options={{headerTitle: 'Sign Up'}}
          name="Register"
          component={RegisterConnector}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
