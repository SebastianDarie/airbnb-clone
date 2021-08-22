import {RegisterController} from '@second-gear/controller';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LandingController} from '../modules/landing/LandingPageController';
import {LandingScreenNavigationProp} from './RootNavigation';

export const LandingPage: React.FC<LandingScreenNavigationProp> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <RegisterController>
        {({data, loading, submit}) => (
          <LandingController
            navigation={navigation}
            data={data}
            loading={loading}
            submit={submit}
          />
        )}
      </RegisterController>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },
});
