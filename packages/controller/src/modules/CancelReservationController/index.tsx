import { ApolloError, FetchResult } from '@apollo/client';
import React from 'react';
import {
  CancelReservationMutation,
  useCancelReservationMutation,
} from '../../generated/graphql';

interface CancelReservationControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (
      id: string
    ) => Promise<
      FetchResult<
        CancelReservationMutation,
        Record<string, any>,
        Record<string, any>
      >
    >;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const CancelReservationController: React.FC<CancelReservationControllerProps> = ({
  children,
}) => {
  const [cancelReservation, { loading }] = useCancelReservationMutation();

  const submit = (id: string) => {
    return cancelReservation({
      variables: {
        id,
      },
      update: (cache) => {
        cache.evict({ id: 'Reservation:' + id });
        cache.gc();
      },
    });
  };

  return <>{children({ loading, submit })}</>;
};
