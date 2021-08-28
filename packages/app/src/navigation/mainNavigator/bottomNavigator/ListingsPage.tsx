import React from 'react';
import {ListingsMap} from '../../../components/listing/ListingsMap';
import {ListingsScreenNavigationProp} from '../../RootNavigation';

export const ListingsPage: React.FC<ListingsScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <ListingsMap navigation={navigation} route={route} />;
};
