import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  createNavigationContainerRef,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AuthStackParamList} from './AuthNavigator';
import {RootStackParamList} from './MainNavigator';
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

export type MainScreenNavigationProp = StackNavigationProps<
  RootStackParamList,
  'Home'
>;

export type CalendarScreenNavigationProp = StackNavigationProps<
  RootStackParamList,
  'Calendar'
>;

export type DescriptionScreenNavigationProp = StackNavigationProps<
  RootStackParamList,
  'Description'
>;

export type GuestsScreenNavigationProp = StackNavigationProps<
  RootStackParamList,
  'Guests'
>;

export type ReviewsScreenNavigationProp = StackNavigationProps<
  RootStackParamList,
  'Reviews'
>;

export type RoomScreenNavigationProp = StackNavigationProps<
  RootStackParamList,
  'Room'
>;

export type SearchScreenNavigationProp = StackNavigationProps<
  RootStackParamList,
  'Search'
>;

export type ListingsScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<ExploreStackParamList, 'Listings'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Explore'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type ExploreScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Explore'>,
  NativeStackScreenProps<ExploreStackParamList>
>;

export type ExploreNavigationProp = {
  navigation: ExploreScreenNavigationProp;
  route: RouteProp<TabParamList, 'Explore'>;
};

export type RootStackRoutes =
  | 'Calendar'
  | 'Guests'
  | 'Home'
  | 'Room'
  | 'Search';

export const navigationRef = createNavigationContainerRef();
