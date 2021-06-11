import React from 'react';
import { AuthFormProps } from '../../types';
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from '../../generated/graphql';

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
  const [login, { data, loading }] = useLoginMutation({
    notifyOnNetworkStatusChange: true,
  });

  const submit = async (values: AuthFormProps) => {
    await login({
      variables: { ...values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.login.user,
          },
        });
      },
    });

    // if (data?.login.user) {
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
