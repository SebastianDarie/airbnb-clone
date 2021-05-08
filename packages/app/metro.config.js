/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const watchFolders = [
  path.resolve(__dirname, '../..', 'node_modules'),
  path.resolve(path.join(__dirname, '/../common/')),
  path.resolve(path.join(__dirname, '/../controller/')),
];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders,
};
