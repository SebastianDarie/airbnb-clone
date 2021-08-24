import React from 'react';
import {SearchPageController} from '../../modules/search/SearchPageController';
import {SearchScreenNavigationProp} from '../RootNavigation';

export const SearchPage: React.FC<SearchScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <SearchPageController navigation={navigation} route={route} />;
};
