import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {Appbar, Colors, IconButton} from 'react-native-paper';
import {PreferencesContext} from '../../lib/PreferencesContext';

export const AuthHeader: React.FC<NativeStackHeaderProps> = ({
  back,
  navigation,
  options,
}) => {
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);

  return (
    <Appbar.Header>
      {back ? <Appbar.Action icon="close" onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.headerTitle} />
      <IconButton
        icon="theme-light-dark"
        color={isThemeDark ? Colors.orange900 : Colors.yellow300}
        size={20}
        onPress={toggleTheme}
      />
    </Appbar.Header>
  );
};
