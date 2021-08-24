import React from 'react';
import {GuestsController} from '../../modules/guests/GuestsController';
import {GuestsScreenNavigationProp} from '../RootNavigation';

export const GuestsPage: React.FC<GuestsScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <GuestsController navigation={navigation} route={route} />;
};
