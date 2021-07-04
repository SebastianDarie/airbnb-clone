//const path = require('path');
//const withTM = require('next-transpile-modules')(['@airbnb-clone/controller']);
const fs = require('fs');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      env: {
        loadMapScenario: fs
          .readFileSync('./public/loadMapScenario.js')
          .toString(),
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
