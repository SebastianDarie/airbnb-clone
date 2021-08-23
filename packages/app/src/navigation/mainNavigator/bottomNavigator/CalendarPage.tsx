import React from 'react';
import {CalendarController} from '../../../modules/calendar/CalendarController';
import {ExploreNavigationProp} from '../../RootNavigation';

export const CalendarPage: React.FC<ExploreNavigationProp> = ({
  navigation,
  route,
}) => {
  return <CalendarController navigation={navigation} route={route} />;
};
