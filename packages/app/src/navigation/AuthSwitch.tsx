import {useMeQuery} from '@second-gear/controller';
import React from 'react';
import {Loading} from '../components/Loading';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';

interface AuthSwitchProps {}

export const AuthSwitch: React.FC<AuthSwitchProps> = () => {
  const {data, loading} = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  if (!data?.me && !loading) {
    return <AuthNavigator />;
  }

  return <MainNavigator />;
};
