import React from 'react';
import {GuestsController} from '../../modules/guests/GuestsController';

interface GuestsPageProps {}

export const GuestsPage: React.FC<GuestsPageProps> = ({}) => {
  return <GuestsController />;
};
