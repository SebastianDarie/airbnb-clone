import { Exact, HeadersQuery, useHeadersQuery } from '@airbnb-clone/controller';
import { QueryResult } from '@apollo/client';
import { useRouter } from 'next/router';

export const useGetHeadersFromUrl = (): QueryResult<
  HeadersQuery,
  Exact<{
    headerId: string;
  }>
> => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  return useHeadersQuery({
    skip: id === '',
    variables: {
      headerId: id,
    },
    notifyOnNetworkStatusChange: true,
  });
};
