import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  createNavigationContainerRef,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from './AuthNavigator';
import {
  ExploreStackParamList,
  TabParamList,
} from './mainNavigator/BottomNavigator';

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

export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? {screen: K; params?: ParamList[K]}
    : {screen: K; params: ParamList[K]};
}[keyof ParamList];

export type LandingScreenNavigationProp = StackNavigationProps<
  AuthStackParamList,
  'LandingModal'
>;

export type LoginScreenNavigationProp = StackNavigationProps<
  AuthStackParamList,
  'LoginModal'
>;

// export type MainScreenNavigationProp = StackNavigationProps<
//   ExploreStackParamList,
//   'Main'
// >;

// export type SearchScreenNavigationProp = StackNavigationProps<
//   ExploreStackParamList,
//   'Search'
// >;

export type ExploreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Explore'>,
  NativeStackNavigationProp<ExploreStackParamList>
>;

export type ExploreNavigationProp = {
  navigation: ExploreScreenNavigationProp;
  route: RouteProp<TabParamList, 'Explore'>;
};

export const navigationRef = createNavigationContainerRef();

// export function navigate(name, params = {}) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }
