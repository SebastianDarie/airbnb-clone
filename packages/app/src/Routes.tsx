import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native-paper';

interface RoutesProps {}

const Stack = createStackNavigator();

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: () => null}}
        initialRouteName="Login">
        {/* <Stack.Screen options={{headerTitle: 'Sign In'}} /> */}
        <Stack.Screen
          options={{headerTitle: 'Sign Up'}}
          name="Register"
          component={<Text>hello</Text>}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
