// load the default config generator.
var webpack = require('webpack')
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function(config, env) {
  var config = genDefaultConfig(config, env);

  // Extend it as you need.
  config.resolve.alias['react-native'] = 'react-native-web'

  config.plugins.push(
    new webpack.DefinePlugin({
        __DEV__: true
        // __PROD__: env.prod || false,

        // Note: `process.env.NODE_ENV` is automatically set with `webpack -p`
        //       which is needed for build React in prod mode
      })
  )


  return config;
};
