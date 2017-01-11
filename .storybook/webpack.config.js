// load the default config generator.
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function(config, env) {
  var config = genDefaultConfig(config, env);

  // Extend it as you need.
  config.resolve.alias['react-native'] = 'react-native-web'

  return config;
};
