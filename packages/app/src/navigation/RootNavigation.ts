import {
  createNavigationContainerRef,
  NavigationContainerRef,
  ParamListBase,
  RouteProp,
  StackActions,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: {screen: K; params?: T[K]};
}[keyof T];

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
    navigationRef.navigate(name, params);
  }
}
