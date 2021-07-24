import React from 'react';
import { useForgotPasswordMutation } from '../../generated/graphql';
import { ForgotPasswordProps } from '../../types';

interface ForgotPasswordControllerProps {
  children: (data: {
    loading?: boolean;
    submit: (values: ForgotPasswordProps) => Promise<boolean>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const ForgotPasswordController: React.FC<ForgotPasswordControllerProps> = ({
  children,
}) => {
  const [forgotPassword, { loading }] = useForgotPasswordMutation();

  const submit = async (values: ForgotPasswordProps) => {
    await forgotPassword({
      variables: { email: values.email },
    });
    return true;
  };

  return <>{children({ loading, submit })}</>;
};
