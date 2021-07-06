import { ApolloError } from '@apollo/client';
import React from 'react';
import { useCreateMessageMutation } from '../../generated/graphql';
import { MessageFormProps } from '../../types';

interface CreateMessageControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (values: MessageFormProps) => Promise<boolean>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const CreateMessageController: React.FC<CreateMessageControllerProps> = ({
  children,
}) => {
  const [createMessage, { error, loading }] = useCreateMessageMutation();

  const submit = async (values: MessageFormProps) => {
    await createMessage({
      variables: { input: { ...values } },
    });

    return true;
  };

  return <>{children({ error, loading, submit })}</>;
};
