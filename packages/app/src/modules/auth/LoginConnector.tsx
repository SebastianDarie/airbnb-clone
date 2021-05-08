import {LoginController} from '@airbnb-clone/controller';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/stacks/auth/AuthParamList';
import {LoginView} from '../../views/LoginView';

export const LoginConnector = ({navigation}: AuthNavProps<'Login'>) => {
  // const storeSessionId = async (sid: string) => {
  //   try {
  //     await AsyncStorage.setItem('sid', sid);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <LoginController>
        {({data, loading, submit}) => (
          <LoginView data={data} loading={loading} submit={submit} />
        )}
      </LoginController>
      <Button
        onPress={() => {
          navigation.navigate('Register');
        }}>
        Navigate
      </Button>
    </>
  );
};
