import {Platform} from 'react-native';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const host =
  Platform.OS === 'ios'
    ? 'http://localhost:4000/graphql'
    : 'http://192.168.0.4:4000/graphql';

//console.log(host);

export const client = new ApolloClient({
  assumeImmutableResults: true,
  queryDeduplication: true,
  uri: host,
  credentials: 'include',
  cache: new InMemoryCache(),
});
