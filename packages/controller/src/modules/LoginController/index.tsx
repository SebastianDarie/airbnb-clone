import React from 'react';
import { useRouter } from 'next/router';
import { FormProps } from '../..';
import { LoginMutation, useLoginMutation } from '../../generated/graphql';

interface LoginControllerProps {
  children: (data: {
    data?: LoginMutation | null | undefined;
    loading?: boolean;
    submit: (values: FormProps) => Promise<LoginMutation | null | undefined>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const LoginController: React.FC<LoginControllerProps> = ({
  children,
}) => {
  const router = useRouter();
  const [login, { data, loading }] = useLoginMutation({
    notifyOnNetworkStatusChange: true,
  });

  const submit = async (values: FormProps) => {
    const { data } = await login({
      variables: { email: values.email, password: values.password },
    });
    console.log(data);
    if (!data?.login.errors) {
      router.push('/');
    }

    return data;
  };

  return <>{children({ data, loading, submit })}</>;
};
