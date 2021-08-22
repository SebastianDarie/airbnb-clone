import React from 'react';
import {SearchPageController} from '../../../modules/search/SearchPageController';
import {SearchScreenNavigationProp} from '../../RootNavigation';

export const SearchPage: React.FC<SearchScreenNavigationProp> = ({
  navigation,
}) => {
  return <SearchPageController navigation={navigation} />;
};
