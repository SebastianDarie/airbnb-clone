import {LoginController} from '@second-gear/controller';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LoginModal} from '../modules/landing/LoginModalController';

export const LoginPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <LoginController>
        {({data, loading, submit}) => (
          <LoginModal data={data} loading={loading} submit={submit} />
        )}
      </LoginController>
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
