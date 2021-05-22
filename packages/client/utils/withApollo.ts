import { Message } from '@airbnb-clone/controller';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { NextPageContext } from 'next';
import { withApollo as createWithApollo } from 'next-apollo';

const linkCreate = (
  ctx: NextPageContext | undefined
): ApolloLink | undefined => {
  const httpLink = new HttpLink({
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
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

  return process.browser
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
};

const createClient = (ctx: NextPageContext | undefined) =>
  new ApolloClient({
    assumeImmutableResults: true,
    queryDeduplication: true,
    ssrMode: typeof window === 'undefined',
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    link: linkCreate(ctx),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            messages: {
              keyArgs: ['listingId'],
              merge(
                existing: Message[] | undefined,
                incoming: Message[]
              ): Message[] {
                return {
                  ...[...(existing || []), ...incoming],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
