import React from 'react';
import {MainController} from '../../modules/main/MainController';
import {MainScreenNavigationProp} from '../RootNavigation';

export const MainPage: React.FC<MainScreenNavigationProp> = ({navigation}) => {
  return <MainController />;
};
