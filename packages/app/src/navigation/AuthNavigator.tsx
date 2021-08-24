import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthHeader} from '../components/header/AuthHeader';
import {LandingPage} from './LandingPage';
import {LoginPage} from './LoginPage';

export type AuthStackParamList = {
  LandingModal: undefined;
  LoginModal: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="LandingModal"
        screenOptions={{
          header: props => <AuthHeader {...props} />,
        }}>
        <Stack.Screen
          name="LandingModal"
          component={LandingPage}
          options={{headerTitle: 'Log in or sign up to AirBnb'}}
        />
        <Stack.Screen
          name="LoginModal"
          component={LoginPage}
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Log in or sign up to AirBnb',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </>
  );
};
