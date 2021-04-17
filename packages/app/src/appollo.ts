import {Platform} from 'react-native';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const host =
  Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://10.0.2.2:4000';

export const client = new ApolloClient({
  assumeImmutableResults: true,
  queryDeduplication: true,
  uri: host,
  cache: new InMemoryCache(),
});
