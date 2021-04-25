import {FormProps, LoginController} from '@airbnb-clone/controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/AuthParamList';
import {LoginView} from '../../views/LoginView';

export const LoginConnector = ({navigation}: AuthNavProps<'Login'>) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormProps>({criteriaMode: 'all'});

  const onSubmit = handleSubmit(data => {
    console.log(data);
    console.log(isSubmitting);
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), 1000);
    });
  });

  const storeSessionId = async (sid: string) => {
    try {
      await AsyncStorage.setItem('sid', sid);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoginController onSessionId={storeSessionId}>
        {({submit}) => (
          <LoginView
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            submit={submit}
          />
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
