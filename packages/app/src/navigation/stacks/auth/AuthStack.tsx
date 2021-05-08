import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LoginConnector} from '../../../modules/auth/LoginConnector';
import {RegisterConnector} from '../../../modules/auth/RegisterConnector';
import {AuthParamList} from './AuthParamList';

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName="Login">
      <Stack.Screen
        options={{headerTitle: 'Sign In'}}
        name="Login"
        component={LoginConnector}
      />
      <Stack.Screen
        options={{headerTitle: 'Sign Up'}}
        name="Register"
        component={RegisterConnector}
      />
    </Stack.Navigator>
  );
};
