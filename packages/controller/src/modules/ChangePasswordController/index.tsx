import { useRouter } from 'next/router';
import React from 'react';
import {
  ChangePasswordMutation,
  useChangePasswordMutation,
} from '../../generated/graphql';
import { AuthFormProps } from '../../types';

interface ChangePasswordControllerProps {
  children: (data: {
    data?: ChangePasswordMutation | null | undefined;
    loading?: boolean;
    submit: (values: AuthFormProps) => Promise<boolean>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const ChangePasswordController: React.FC<ChangePasswordControllerProps> = ({
  children,
}) => {
  const router = useRouter();
  const [changePassword, { data, loading }] = useChangePasswordMutation();

  const submit = async (values: AuthFormProps) => {
    const response = await changePassword({
      variables: {
        newPassword: values.password,
        token: typeof router.query.token === 'string' ? router.query.token : '',
      },
    });

    if (!response.data?.changePassword.errors) {
      router.push('/');
    }

    return true;
  };

  return <>{children({ data, loading, submit })}</>;
};
