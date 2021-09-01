import React from 'react';
import {ReserveController} from '../../modules/reserve/ReserveController';
import {ReserveScreenNavigationProp} from '../RootNavigation';

export const ReservePage: React.FC<ReserveScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <ReserveController navigation={navigation} route={route} />;
};
