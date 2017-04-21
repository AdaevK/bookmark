const path = require('path'),
      webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    landing: ['./js/landing/application.js', './css/landing/application.scss' ],
    dashboard: ['./js/dashboard/application.js', './css/dashboard/application.scss' ],
  },
  output: {
    path: path.resolve(__dirname, '../build/assets'),
    filename: '[name].js',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader', ],
        exclude: [/node_modules/]
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1'
        })
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpe?g|gif)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
