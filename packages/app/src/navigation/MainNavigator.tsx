import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginModal} from '../components/LoginModal';
import {MainPage} from './mainNavigator/MainPage';

export type RootStackParamList = {
  LoginModal: undefined;
  Main: undefined;
  Explore: undefined;
  Inbox: undefined;
  Room: {roomId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen
            name="Explore"
            component={MainPage}
            options={{headerShown: false}}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="LoginModal"
            component={LoginModal}
            options={{
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Group>
        {/* <Stack.Screen
          name="Main"
          component={MainPage}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </>
  );
};
