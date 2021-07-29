import React from 'react';
import { RegisterFormProps } from '../../types';
import {
  MeDocument,
  MeQuery,
  RegisterMutation,
  useRegisterMutation,
} from '../../generated/graphql';
import { FetchResult } from '@apollo/client';

interface RegisterControllerProps {
  children: (data: {
    data?: RegisterMutation | null | undefined;
    loading?: boolean;
    submit: (
      values: RegisterFormProps
    ) => Promise<
      FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>
    >;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
}) => {
  const [register, { data, loading }] = useRegisterMutation();

  const submit = async (values: RegisterFormProps) => {
    return register({
      variables: { ...values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.register.user,
          },
        });
      },
    });
  };

  return <>{children({ data, loading, submit })}</>;
};
