import {Fonts} from 'react-native-paper/lib/typescript/types';

export const fontConfig:
  | {
      ios?: Fonts | undefined;
      android?: Fonts | undefined;
      macos?: Fonts | undefined;
      windows?: Fonts | undefined;
      web?: Fonts | undefined;
      native?: Fonts | undefined;
      default?: Fonts | undefined;
    }
  | undefined = {
  web: {
    regular: {
      fontFamily: 'CerealBook',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'CerealMedium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'CerealLight',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'CerealBlack',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'CerealBook',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'CerealMedium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'CerealLight',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'CerealBlack',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'CerealBook',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'CerealMedium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'CerealLight',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'CerealBlack',
      fontWeight: 'normal',
    },
  },
};
