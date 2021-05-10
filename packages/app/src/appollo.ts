import {Platform} from 'react-native';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const host =
  Platform.OS === 'ios'
    ? 'http://localhost:4000/graphql'
    : 'http://10.0.2.2:4000/graphql';

export const client = new ApolloClient({
  assumeImmutableResults: true,
  queryDeduplication: true,
  uri: host,
  credentials: 'include',
  cache: new InMemoryCache(),
});
