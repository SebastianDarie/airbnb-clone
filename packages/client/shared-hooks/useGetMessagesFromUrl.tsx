import {
  Exact,
  MessagesQuery,
  useMessagesQuery,
} from '@airbnb-clone/controller';
import { QueryResult } from '@apollo/client';
import { useRouter } from 'next/router';

export const useGetMessagesFromUrl = (): QueryResult<
  MessagesQuery,
  Exact<{
    listingId: string;
  }>
> => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  console.log(id);
  return useMessagesQuery({
    skip: id === '',
    variables: {
      listingId: id,
    },
  });
};
