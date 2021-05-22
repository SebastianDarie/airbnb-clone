import { ApolloError } from '@apollo/client';
import React from 'react';
import { useCreateListingMutation } from '../../generated/graphql';
import { ListingFormProps } from '../../types';

interface CreateListingControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (values: ListingFormProps, photoUrl: string) => Promise<boolean>;
  }) => React.ReactNode;
}

export const CreateListingController: React.FC<CreateListingControllerProps> = ({
  children,
}) => {
  const [createListing, { error, loading }] = useCreateListingMutation();

  const submit = async (values: ListingFormProps, photoUrl: string) => {
    await createListing({
      variables: { input: { ...values, photoUrl } },
    });

    return true;
  };

  return <>{children({ error, loading, submit })}</>;
};
