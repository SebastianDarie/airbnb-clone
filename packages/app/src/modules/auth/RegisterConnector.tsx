import {FormProps, RegisterController} from '@airbnb-clone/controller';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/AuthParamList';
import {RegisterView} from '../../views/RegisterView';

export const RegisterConnector = ({navigation}: AuthNavProps<'Register'>) => {
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

  return (
    <>
      <RegisterController>
        {({submit}) => (
          <RegisterView
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            submit={submit}
          />
        )}
      </RegisterController>
      <Button
        onPress={() => {
          navigation.navigate('Register');
        }}>
        Navigate
      </Button>
    </>
  );
};
