import {SearchListings, WithListingsProps} from '@airbnb-clone/controller';
import Slider from '@react-native-community/slider';
import React, {useState} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, Card, Paragraph, TextInput, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthNavProps} from '../../navigation/stacks/auth/AuthParamList';

const ListingsConnector = ({
  navigation,
}: AuthNavProps<'Login'> & WithListingsProps) => {
  const [title, setTitle] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const [beds, setBeds] = useState<number>(1);

  return (
    <>
      <SafeAreaView />
      <TextInput
        placeholder="Search..."
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Slider
        onValueChange={value => setGuests(value)}
        value={guests}
        step={1}
        minimumValue={1}
        maximumValue={16}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Slider
        onValueChange={value => setBeds(value)}
        value={beds}
        step={1}
        minimumValue={1}
        maximumValue={8}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <SearchListings input={{title}} limit={10} cursor={null}>
        {({searchListings}, fetchMore) => (
          <FlatList
            ListFooterComponent={() =>
              searchListings.hasMore ? (
                <Button
                  onPress={() => {
                    fetchMore({
                      variables: {
                        limit: 10,
                        cursor:
                          searchListings.listings[
                            searchListings.listings.length - 1
                          ].createdAt,
                      },
                    });
                  }}>
                  Load more listings
                </Button>
              ) : (
                <View />
              )
            }
            onEndReached={() => {
              console.log('reached end');
            }}
            onEndReachedThreshold={2}
            data={searchListings.listings}
            keyExtractor={({id}) => `${id}-flc`}
            renderItem={({item: listing}) => (
              <Card key={listing.id}>
                <Card.Content>
                  <Title>{listing.title}</Title>
                  <Paragraph>{listing.description}</Paragraph>
                </Card.Content>
                <Card.Cover source={{uri: listing.photoUrl}} />
              </Card>
            )}
          />
        )}
      </SearchListings>

      <Button
        onPress={() => {
          navigation.navigate('Me');
        }}>
        Me page
      </Button>
    </>
  );
};

export default ListingsConnector;
