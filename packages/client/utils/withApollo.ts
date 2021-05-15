import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { NextPageContext } from 'next';
import { withApollo as createWithApollo } from 'next-apollo';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL as string,
      options: {
        reconnect: true,
      },
    })
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink!,
      httpLink
    )
  : undefined;

const createClient = (ctx: NextPageContext | undefined) =>
  new ApolloClient({
    assumeImmutableResults: true,
    queryDeduplication: true,
    ssrMode: typeof window === 'undefined',
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    link: splitLink,
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
