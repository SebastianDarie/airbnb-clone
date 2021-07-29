import {useMeQuery} from '@second-gear/controller';
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {AuthNavProps} from '../../navigation/stacks/auth/AuthParamList';

const Me = ({navigation}: AuthNavProps<'Me'>) => {
  const {data, loading} = useMeQuery({notifyOnNetworkStatusChange: true});

  return (
    <>
      {!data && loading ? (
        <View>
          <Text>loading...</Text>
        </View>
      ) : (
        <View>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      )}
      <Button
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Login
      </Button>
    </>
  );
};

export default Me;
