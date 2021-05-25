import {SearchListings, WithListingsProps} from '@airbnb-clone/controller';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/stacks/auth/AuthParamList';

const ListingsConnector = ({
  navigation,
}: AuthNavProps<'Login'> & WithListingsProps) => {
  return (
    <SearchListings input={{beds: 1}} limit={10} cursor={null}>
      {({searchListings}) => (
        <ScrollView>
          {searchListings &&
            searchListings.listings.map(listing => (
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
      )}
    </SearchListings>
  );
};

export default ListingsConnector;
