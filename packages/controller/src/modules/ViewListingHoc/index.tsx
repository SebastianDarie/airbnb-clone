import React from 'react';
import { ApolloError } from '@apollo/client';
import { ListingQuery, useListingQuery } from '../../generated/graphql';

export interface WithListingProps {
  data: ListingQuery | undefined;
  error: ApolloError | undefined;
  loading: boolean;
}

export function withListing<ComponentProps>(
  WrappedComponent: React.ComponentType<ComponentProps & WithListingProps>,
  id: string
) {
  return (props: ComponentProps) => {
    const { data, error, loading } = useListingQuery({
      notifyOnNetworkStatusChange: true,
      variables: { id },
    });

    return (
      <WrappedComponent
        {...props}
        data={data}
        error={error}
        loading={loading}
      />
    );
  };
}
