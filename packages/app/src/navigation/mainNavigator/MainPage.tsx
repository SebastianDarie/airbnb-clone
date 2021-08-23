import React from 'react';
import {MainController} from '../../modules/main/MainController';
import {ExploreNavigationProp} from '../RootNavigation';

export const MainPage: React.FC<ExploreNavigationProp> = ({
  navigation,
  route,
}) => {
  return <MainController navigation={navigation} route={route} />;
};
