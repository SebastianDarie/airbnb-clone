const fs = require('fs');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      env: {
        stripe: 'pk_test_dZb4PNLF72WK9NZenscqBEB1008RXx0tOT',
      },
      future: {
        webpack5: true,
      },
      images: {
        domains: [
          'res.cloudinary.com',
          'dummyimage.com',
          'a0.muscache.com',
          'd9r6g0xftldzw.cloudfront.net',
        ],
      },

      // async redirects() {
      //   return [
      //     {
      //       source: '/inbox',
      //       destination: '/inbox/header/:id',
      //       permanent: true,
      //     },
      //   ];
      // },
    };
  }

  return {
    ...defaultConfig,
    future: {
      webpack5: true,
    },
    images: {
      domains: ['a0.muscache.com'],
    },
  };
};
