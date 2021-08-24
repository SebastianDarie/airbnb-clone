import React from 'react';
import {CalendarController} from '../../modules/calendar/CalendarController';
import {CalendarScreenNavigationProp} from '../RootNavigation';

export const CalendarPage: React.FC<CalendarScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <CalendarController navigation={navigation} route={route} />;
};
