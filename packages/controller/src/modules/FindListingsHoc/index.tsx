import React from 'react';
import { ApolloError } from '@apollo/client';
import { ListingsQuery, useListingsQuery } from '../../generated/graphql';

export interface WithListingsProps {
  data: ListingsQuery | undefined;
  error: ApolloError | undefined;
  loading: boolean;
}

export function withListings<ComponentProps>(
  WrappedComponent: React.ComponentType<ComponentProps & WithListingsProps>
) {
  return (props: ComponentProps) => {
    const { data, error, loading } = useListingsQuery({
      notifyOnNetworkStatusChange: true,
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
