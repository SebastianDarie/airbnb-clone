import React from 'react';
//import { useRouter } from 'next/router';
import { FormProps } from '../..';
import { RegisterMutation, useRegisterMutation } from '../../generated/graphql';

interface LoginControllerProps {
  children: (data: {
    data?: RegisterMutation | null | undefined;
    loading?: boolean;
    submit: (values: FormProps) => Promise<RegisterMutation | null | undefined>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const LoginController: React.FC<LoginControllerProps> = ({
  children,
}) => {
  //const router = useRouter();
  const [register, { data, loading }] = useRegisterMutation();

  const submit = async (values: FormProps) => {
    const { data } = await register({
      variables: { email: values.email, password: values.password },
    });
    console.log(data);
    // if (!data?.register.errors) {
    //   router.push('/');
    // }

    return data;
  };

  return <>{children({ data, loading, submit })}</>;
};
