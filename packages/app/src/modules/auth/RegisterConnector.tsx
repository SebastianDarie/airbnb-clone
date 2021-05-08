import {RegisterController} from '@airbnb-clone/controller';
import React from 'react';
import {Button} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/stacks/auth/AuthParamList';
import {RegisterView} from '../../views/RegisterView';

export const RegisterConnector = ({navigation}: AuthNavProps<'Register'>) => {
  return (
    <>
      <RegisterController>
        {({submit}) => <RegisterView submit={submit} />}
      </RegisterController>
      <Button
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Navigate
      </Button>
    </>
  );
};
