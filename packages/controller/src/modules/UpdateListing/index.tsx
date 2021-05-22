import { ApolloError } from '@apollo/client';
import React from 'react';
import { useUpdateListingMutation } from '../../generated/graphql';
import { NullPartial, ListingFormProps } from '../../types';

interface UpdateListingControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (
      id: string,
      values: NullPartial<ListingFormProps>
    ) => Promise<boolean>;
  }) => React.ReactNode;
}

export const UpdateListingController: React.FC<UpdateListingControllerProps> = ({
  children,
}) => {
  const [updateListing, { error, loading }] = useUpdateListingMutation();

  const submit = async (id: string, values: NullPartial<ListingFormProps>) => {
    await updateListing({
      variables: { id, input: { ...values } },
    });

    return true;
  };

  return <>{children({ error, loading, submit })}</>;
};
