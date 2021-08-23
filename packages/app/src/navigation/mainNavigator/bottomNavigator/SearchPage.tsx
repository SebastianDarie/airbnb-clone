import React from 'react';
import {SearchPageController} from '../../../modules/search/SearchPageController';
import {ExploreNavigationProp} from '../../RootNavigation';

export const SearchPage: React.FC<ExploreNavigationProp> = ({
  navigation,
  route,
}) => {
  return <SearchPageController navigation={navigation} route={route} />;
};
