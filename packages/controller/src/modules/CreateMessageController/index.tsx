import { ApolloError, FetchResult } from '@apollo/client';
import React from 'react';
import {
  CreateMessageMutation,
  useCreateMessageMutation,
} from '../../generated/graphql';
import { MessageFormProps } from '../../types';

interface CreateMessageControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (
      values: MessageFormProps
    ) => Promise<
      FetchResult<
        CreateMessageMutation,
        Record<string, any>,
        Record<string, any>
      >
    >;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const CreateMessageController: React.FC<CreateMessageControllerProps> = ({
  children,
}) => {
  const [createMessage] = useCreateMessageMutation();

  const submit = (values: MessageFormProps) => {
    return createMessage({
      variables: {
        input: {
          ...values,
        },
      },
      optimisticResponse: {
        createMessage: {
          __typename: 'Message',
          createdAt: new Date().toUTCString(),
          creator: {
            id: 'temp-id',
            __typename: 'User',
            name: 'User',
            photoUrl: 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3',
            createdAt: Math.floor(new Date().getTime() / 1000).toString(),
          },
          headerId: values.headerId,
          id: 'temp-id',
          isFromSender: values.isFromSender,
          text: values.text,
        },
      },
    });
  };

  return <>{children({ submit })}</>;
};
