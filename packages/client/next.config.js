const path = require('path');
const withTM = require('next-transpile-modules')(['@airbnb-clone/controller']);

module.exports = withTM({
  future: {
    webpack5: true,
  },
});
