import React from 'react';
import {RoomPageController} from '../../modules/room/RoomPageController';
import {RoomScreenNavigationProp} from '../RootNavigation';

export const RoomPage: React.FC<RoomScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <RoomPageController navigation={navigation} route={route} />;
};
