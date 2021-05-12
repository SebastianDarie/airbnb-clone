import {CreateListingController} from '@airbnb-clone/controller';
import React from 'react';
import {Button} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/stacks/auth/AuthParamList';
import CreateListingView from '../../views/CreateListingView';

export const CreateListingConnector = ({navigation}: AuthNavProps<'Login'>) => {
  return (
    <>
      <CreateListingController>
        {({error, loading, submit}) => (
          <CreateListingView error={error} loading={loading} submit={submit} />
        )}
      </CreateListingController>

      <Button
        onPress={() => {
          navigation.navigate('Me');
        }}>
        Me page
      </Button>
    </>
  );
};
