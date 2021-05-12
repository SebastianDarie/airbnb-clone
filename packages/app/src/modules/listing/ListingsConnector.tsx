import {withListings, WithListingsProps} from '@airbnb-clone/controller';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/stacks/auth/AuthParamList';

const ListingsConnector = ({
  data,
  error,
  loading,
  navigation,
}: AuthNavProps<'Login'> & WithListingsProps) => {
  if ((!data && !loading) || error) {
    <div>
      <div>failed to load listings</div>
      <div>{error?.message}</div>
    </div>;
  }

  if (loading) {
    <div>loading listings...</div>;
  }

  return (
    <ScrollView>
      {data &&
        data.listings.map(listing => (
          <Card key={listing.id}>
            <Card.Content>
              <Title>{listing.title}</Title>
              <Paragraph>{listing.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: listing.photoUrl}} />
          </Card>
        ))}

      <Button
        onPress={() => {
          navigation.navigate('Me');
        }}>
        Me page
      </Button>
    </ScrollView>
  );
};

export default withListings(ListingsConnector);
