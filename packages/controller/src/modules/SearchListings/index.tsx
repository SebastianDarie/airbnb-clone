import React from 'react';
import {
  SearchInput,
  SearchListingsQuery,
  useSearchListingsQuery,
} from '../../generated/graphql';

interface SearchListingsProps {
  input: SearchInput;
  limit: number;
  cursor: string | null;
  children: (data: SearchListingsQuery) => React.ReactNode;
}

export const SearchListings: React.FC<SearchListingsProps> = ({
  input,
  limit,
  cursor,
  children,
}) => {
  const { data, error, loading } = useSearchListingsQuery({
    variables: { input, limit, cursor },
    notifyOnNetworkStatusChange: true,
  });

  if (!data && loading) {
    return <div>loading...</div>;
  }

  if (!data && error) {
    return (
      <div>
        <div>failed to search listings</div>
        <div>{error.message}</div>
      </div>
    );
  }

  return <>{children(data!)}</>;
};
