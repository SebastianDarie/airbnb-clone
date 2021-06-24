import { ApolloError, FetchResult } from '@apollo/client';
import React from 'react';
import {
  CreateListingMutation,
  useCreateListingMutation,
} from '../../generated/graphql';
import { ListingFormProps } from '../../types';

interface CreateListingControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (
      values: ListingFormProps,
      photos: string[]
    ) => Promise<FetchResult<CreateListingMutation>>;
  }) => React.ReactNode;
}

export const CreateListingController: React.FC<CreateListingControllerProps> = ({
  children,
}) => {
  const [createListing] = useCreateListingMutation();

  const submit = async (values: ListingFormProps, photos: string[]) => {
    return createListing({
      variables: { input: { ...values, photos } },
    });
  };

  return <>{children({ submit })}</>;
};
