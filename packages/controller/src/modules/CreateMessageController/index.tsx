import { ApolloError } from '@apollo/client';
import React from 'react';
import {
  HeadersDocument,
  HeadersQuery,
  useCreateMessageMutation,
} from '../../generated/graphql';
import { MessageFormProps } from '../../types';

interface CreateMessageControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (values: MessageFormProps, currHeader: any) => Promise<boolean>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const CreateMessageController: React.FC<CreateMessageControllerProps> = ({
  children,
}) => {
  const [createMessage, { data }] = useCreateMessageMutation();

  const submit = async (values: MessageFormProps, currHeader: any) => {
    await createMessage({
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
            __typename: 'User',
            name: 'Test User',
            photoUrl: 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3',
          },
          headerId: values.headerId,
          id: 'cjsdcsbvhfbsjhbsj',
          isFromSender: values.isFromSender,
          read: 0,
          text: values.text,
        },
      },
      // update: (cache) => {
      //   const newMessage = data?.createMessage;
      //   const currHeaders = cache.readQuery<HeadersQuery>({
      //     query: HeadersDocument,
      //   });
      //   const newHeaders = currHeaders?.headers.map((h) => {
      //     if (h.id === newMessage?.headerId) {
      //       Object.assign(
      //         [...(currHeader?.[0].messages || []), newMessage!],
      //         h.messages
      //       );
      //     }
      //   });

      //   cache.writeQuery({
      //     query: HeadersDocument,
      //     data: {
      //       headers: {
      //         ...newHeaders,
      //       },
      //     },
      //   });
      // },
    });

    return true;
  };

  return <>{children({ submit })}</>;
};
