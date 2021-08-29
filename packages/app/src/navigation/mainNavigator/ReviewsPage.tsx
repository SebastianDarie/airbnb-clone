import React from 'react';
import {ReviewsController} from '../../modules/room/ReviewsController';
import {ReviewsScreenNavigationProp} from '../RootNavigation';

export const ReviewsPage: React.FC<ReviewsScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return <ReviewsController navigation={navigation} route={route} />;
};
