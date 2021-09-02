import React from 'react';
import {TripsController} from '../../../modules/trips/TripsController';
import {TripsScreenNavigationProp} from '../../RootNavigation';

export const TripsPage: React.FC<TripsScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <TripsController navigation={navigation} route={route} />;
};
