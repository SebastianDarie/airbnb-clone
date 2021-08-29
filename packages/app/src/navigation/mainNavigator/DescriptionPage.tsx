import React from 'react';
import {DescriptionController} from '../../modules/room/DescriptionController';
import {DescriptionScreenNavigationProp} from '../RootNavigation';

export const DescriptionPage: React.FC<DescriptionScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <DescriptionController navigation={navigation} route={route} />;
};
