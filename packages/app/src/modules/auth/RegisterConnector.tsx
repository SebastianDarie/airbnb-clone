import React from 'react';
import {useForm} from 'react-hook-form';
import {FormProps, RegisterController} from '@airbnb-clone/controller';
import {RegisterView} from '../../views/RegisterView';

interface RegisterConnectorProps {}

export const RegisterConnector: React.FC<RegisterConnectorProps> = ({}) => {
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
  );
};
