const withPWA = require('next-pwa');
const withTM = require('next-transpile-modules')([
  '@second-gear/common',
  '@second-gear/controller',
]);

module.exports = withTM(
  withPWA({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      register: true,
      skipWaiting: true,
      dynamicStartUrl: false,
    },
    env: {
      stripe: 'pk_test_dZb4PNLF72WK9NZenscqBEB1008RXx0tOT',
    },
    images: {
      domains: [
        'a0.muscache.com',
        'dummyimage.com',
        'd9r6g0xftldzw.cloudfront.net',
      ],
    },
  })
);
