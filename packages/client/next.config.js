const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withTM = require('next-transpile-modules')([
  '@second-gear/common',
  '@second-gear/controller',
]);

module.exports = withBundleAnalyzer(
  withTM({
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
