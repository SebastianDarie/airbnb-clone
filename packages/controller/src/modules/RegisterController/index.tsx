import React from 'react';
import { FormProps } from '../..';

interface RegisterControllerProps {
  children: (data: {
    submit: (values: FormProps) => void;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
}) => {
  const submit = (values: FormProps) => {
    console.log('Received values of form: ', values);
  };

  return <>{children({ submit })}</>;
};
