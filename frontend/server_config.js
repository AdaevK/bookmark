const webpack = require('webpack'),
      WebpackDevServer = require('webpack-dev-server'),
      _ = require('lodash'),
      hotPort = 8080
      layouts = ['landing', 'dashboard']

let config = require('./webpack.config.js')

config.output.publicPath = `http://localhost:${hotPort}/assets/`

console.log(config.entry)

layouts.forEach(entryName => {
    config.entry[entryName].push(
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:' + hotPort,
        'webpack/hot/only-dev-server'
    )
})

module.exports = _.merge(config, {
  devServer: {
    publicPath: config.output.publicPath,
    port: hotPort,
    hot: true,
    noInfo: false,
    quiet: false,
    lazy: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    }
  }
})
