const webpack = require('webpack'),
      _       = require('lodash');

let config = model.exports = require('./main.config.js');

config.output = _.merge(config.output, {
  filename: 'application-[hash].js'
})
