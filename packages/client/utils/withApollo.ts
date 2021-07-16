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
import {
  Header,
  Listing,
  Message,
  PaginatedListings,
} from '@airbnb-clone/controller';

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
          lazy: true,
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
            headers: {
              keyArgs: [],
              merge(existing: Header[], incoming: Header[]) {
                if (!incoming) return existing;
                if (!existing) return incoming;
              },
            },
            searchListings: {
              keyArgs: ['id'],
              merge(
                existing: PaginatedListings | null,
                incoming: PaginatedListings,
                { mergeObjects, readField }
              ): PaginatedListings {
                // const merged: Listing[] = existing
                //   ? existing.listings.slice(0)
                //   : [];
                // const idToIndex: Record<string, number> = Object.create(null);

                // if (existing) {
                //   existing.listings.forEach((l, idx) => {
                //     idToIndex[readField<string>('id', l)!] = idx;
                //   });
                // }

                // incoming.listings.forEach((l) => {
                //   const id = readField<string>('id', l);
                //   const idx = idToIndex[id!];
                //   if (typeof idx === 'number') {
                //     merged[idx] = mergeObjects(merged[idx], l);
                //   } else {
                //     idToIndex[id!] = merged.length;
                //     merged.push(l);
                //   }
                // });

                // return {
                //   ...incoming,
                //   listings: merged,
                // };
                return incoming;
              },
            },
          },
        },
        Header: {
          fields: {
            messages: {
              keyArgs: ['headerId'],
              merge(
                existing: Message[],
                incoming: Message[],
                { mergeObjects, readField }
              ): Message[] {
                const merged: Message[] = existing ? existing.slice(0) : [];
                const textToIndex: Record<string, number> = Object.create(null);

                if (existing) {
                  existing.forEach((m, idx) => {
                    textToIndex[readField<string>('text', m)!] = idx;
                  });
                }

                incoming.forEach((m) => {
                  const text = readField<string>('text', m);
                  const idx = textToIndex[text!];
                  if (typeof idx === 'number') {
                    merged[idx] = mergeObjects(merged[idx], m);
                  } else {
                    textToIndex[text!] = merged.length;
                    merged.push(m);
                  }
                });

                return merged;
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
