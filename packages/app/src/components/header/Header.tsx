import React from 'react';
import {useTheme, Appbar, Switch} from 'react-native-paper';
import {PreferencesContext} from '../../lib/PreferencesContext';

export const Header: React.FC = () => {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}>
      <Appbar.Content title={'Test'} />
      <Switch
        color={'red'}
        theme={theme}
        value={isThemeDark}
        onValueChange={toggleTheme}
      />
    </Appbar.Header>
  );
};
