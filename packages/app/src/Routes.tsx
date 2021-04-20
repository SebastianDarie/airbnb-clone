import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RegisterConnector} from './modules/auth/RegisterConnector';

interface RoutesProps {}

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
};

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={RegisterConnector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
