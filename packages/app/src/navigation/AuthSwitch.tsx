import {useMeQuery} from '@second-gear/controller';
import React from 'react';
import {Text, View} from 'react-native';
import {Loading} from '../components/Loading';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';
import {BottomNavigator} from './mainNavigator/BottomNavigator';

interface AuthSwitchProps {}

export const AuthSwitch: React.FC<AuthSwitchProps> = () => {
  const {data, loading} = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  if (!data?.me && !loading) {
    return <AuthNavigator />;
  }

  return <BottomNavigator />;
};
