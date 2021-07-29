import { Exact, ListingQuery, useListingQuery } from '@second-gear/controller';
import { QueryResult } from '@apollo/client';
import { useRouter } from 'next/router';

export const useGetListingFromUrl = (
  noreviews: boolean
): QueryResult<
  ListingQuery,
  Exact<{
    id: string;
  }>
> => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  return useListingQuery({
    skip: id === '',
    variables: {
      id,
      slim: false,
      noreviews,
    },
    notifyOnNetworkStatusChange: true,
  });
};
