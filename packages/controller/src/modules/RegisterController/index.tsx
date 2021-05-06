import React from 'react';
//import { useRouter } from 'next/router';
import { AuthFormProps } from '../../types';
import { RegisterMutation, useRegisterMutation } from '../../generated/graphql';

interface RegisterControllerProps {
  children: (data: {
    data?: RegisterMutation | null | undefined;
    loading?: boolean;
    submit: (
      values: AuthFormProps
    ) => Promise<RegisterMutation | null | undefined>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
}) => {
  //const router = useRouter();
  const [register, { data, loading }] = useRegisterMutation();

  const submit = async (values: AuthFormProps) => {
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
