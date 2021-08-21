import {useMeQuery} from '@second-gear/controller';
import React from 'react';
import {Loading} from '../components/Loading';
import {LandingController} from '../modules/LandingPageController';
import {MainNavigator} from './MainNavigator';

interface AuthSwitchProps {}

export const AuthSwitch: React.FC<AuthSwitchProps> = () => {
  const {data, error, loading} = useMeQuery();
  console.log(error, loading);

  if (loading && !data?.me) {
    return <Loading />;
  }

  if (!data?.me && !loading) {
    return <LandingController />;
  }

  return <MainNavigator />;
};
