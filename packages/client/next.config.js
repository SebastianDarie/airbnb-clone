//const path = require('path');
//const withTM = require('next-transpile-modules')(['@airbnb-clone/controller']);
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      future: {
        webpack5: true,
      },
      images: {
        domains: ['res.cloudinary.com', 'dummyimage.com', 'a0.muscache.com'],
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
