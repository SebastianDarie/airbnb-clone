import React from 'react';
import {ListingsController} from '../../../modules/listing/ListingsController';
import {
  ExploreScreenNavigationProp,
  ListingsScreenNavigationProp,
} from '../../RootNavigation';

export const ListingsPage: React.FC<ListingsScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <ListingsController navigation={navigation} route={route} />;
};
