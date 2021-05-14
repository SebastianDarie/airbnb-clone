import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { withApollo } from '../utils/withApollo';

interface TestSubProps {}

const sub = gql`
  subscription NewMessage($listingId: String!) {
    newMessage(listingId: $listingId) {
      id
      text
      creatorId
      createdAt
    }
  }
`;

const TestSub: React.FC<TestSubProps> = ({}) => {
  const { data, error, loading } = useSubscription(sub, {
    onSubscriptionData: () => alert('new data'),
  });

  if (!data && loading) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data && error) {
    return (
      <div>
        <div>failed to load messages</div>
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <>
      {(data: any) => {
        console.log(data);
        return null;
      }}
    </>
  );
};

export default withApollo({ ssr: false })(TestSub);
