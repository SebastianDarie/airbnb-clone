import {Platform} from 'react-native';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {PaginatedListings} from '@second-gear/controller';

const host =
  Platform.OS === 'ios'
    ? 'http://localhost:4000/graphql'
    : 'http://10.0.2.2:4000/graphql';

export const client = new ApolloClient({
  assumeImmutableResults: true,
  queryDeduplication: true,
  uri: host,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listings: {
            keyArgs: [''],
            merge(
              existing: PaginatedListings | undefined,
              incoming: PaginatedListings,
            ): PaginatedListings {
              return {
                ...incoming,
                listings: [...(existing?.listings || []), ...incoming.listings],
              };
            },
          },
        },
      },
    },
  }),
});
