import React from 'react';
import { RegisterFormProps } from '../../types';
import { RegisterMutation, useRegisterMutation } from '../../generated/graphql';

interface RegisterControllerProps {
  children: (data: {
    data?: RegisterMutation | null | undefined;
    loading?: boolean;
    submit: (
      values: RegisterFormProps
    ) => Promise<RegisterMutation | null | undefined>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
}) => {
  const [register, { data, loading }] = useRegisterMutation();

  const submit = async (values: RegisterFormProps) => {
    const { data } = await register({
      variables: { ...values },
    });

    return data;
  };

  return <>{children({ data, loading, submit })}</>;
};
