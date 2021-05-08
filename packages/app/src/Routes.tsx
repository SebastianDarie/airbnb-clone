import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './navigation/stacks/auth/AuthStack';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
