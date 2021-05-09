import React from 'react';
// import { useRouter } from 'next/router';
import { AuthFormProps } from '../../types';
import { LoginMutation, useLoginMutation } from '../../generated/graphql';

interface LoginControllerProps {
  onSessionId?: (sessionId: string) => void;
  children: (data: {
    data?: LoginMutation | null | undefined;
    loading?: boolean;
    submit: (
      values: AuthFormProps
    ) => Promise<LoginMutation | null | undefined>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const LoginController: React.FC<LoginControllerProps> = ({
  children,
  //onSessionId,
}) => {
  //const router = useRouter();
  const [login, { data, loading }] = useLoginMutation({
    notifyOnNetworkStatusChange: true,
  });

  const submit = async (values: AuthFormProps) => {
    console.log('running');
    try {
      await login({
        variables: { email: values.email, password: values.password },
      });
    } catch (err) {
      console.log(err);
    }
    console.log(data);
    // if (!data?.login.errors) {
    //   if (typeof router.query.next === 'string') {
    //     router.push(router.query.next);
    //   } else {
    //     router.push('/');
    //   }
    // }

    // if (data?.login.sessionID && onSessionId) {
    //   onSessionId(data.login.sessionID);
    // }

    return data;
  };

  return <>{children({ data, loading, submit })}</>;
};
