import React from 'react';
import { useForgotPasswordMutation } from '../../generated/graphql';
import { AuthFormProps } from '../../types';

interface ForgotPasswordControllerProps {
  children: (data: {
    loading?: boolean;
    submit: (values: AuthFormProps) => Promise<boolean>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const ForgotPasswordController: React.FC<ForgotPasswordControllerProps> = ({
  children,
}) => {
  const [forgotPassword, { loading }] = useForgotPasswordMutation();

  const submit = async (values: AuthFormProps) => {
    await forgotPassword({
      variables: { email: values.email },
    });
    return true;
  };

  return <>{children({ loading, submit })}</>;
};
