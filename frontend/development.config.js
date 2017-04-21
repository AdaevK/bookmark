const webpack = require('webpack'),
      _       = require('lodash');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = module.exports = require('./main.config.js');

config = _.merge(config, {
});

config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true,
      displayErrorDetails: true,
      outputPathinfo: true,
      devtool: 'inline-source-map'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
)
