const path = require('path');
// Use webpack-merge to reuse code for client & server side webpack config
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  // Tell webpack the root file of our client application
  // NOTE: Outside of this course it would be better to name file index.js
  entry: './src/client/client.js',
  // Tell webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

// Merge the sharable webpack configurations with this file's, then export
module.exports = merge(baseConfig, config);
