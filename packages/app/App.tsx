/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ApolloProvider} from '@apollo/client';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {
  Colors,
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {client} from './src/lib/appollo';
import {AuthSwitch} from './src/navigation/AuthSwitch';
import {PreferencesContext} from './src/lib/PreferencesContext';
import {fontConfig} from './src/lib/fontConfig';
import {navigationRef} from './src/navigation/RootNavigation';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {StatusBar, useColorScheme} from 'react-native';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#00858a',
  },
  fonts: configureFonts(fontConfig),
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#ff385d',
  },
  fonts: configureFonts(fontConfig),
};

const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <ApolloProvider client={client}>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={isThemeDark ? '#ff385c' : '#176e71'}
            />
            <NavigationContainer theme={theme}>
              <AuthSwitch />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </PreferencesContext.Provider>
    </ApolloProvider>
  );
};

export default App;
