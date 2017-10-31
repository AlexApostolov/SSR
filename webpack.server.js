const path = require('path');
// Use webpack-merge to reuse code for client & server side webpack config
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// Only include inside the server side webpack the server dependencies needed--to shorten start up time
const webpackNodeExternals = require('webpack-node-externals');

// Instead of immediately exporting the config object below, save it to a variable to merge with
const config = {
  // Inform webpack that we're building a bundle for Node JS, rather than for the browser
  target: 'node',
  // Tell webpack the root file of our server application
  entry: './src/index.js',
  // Tell webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
};

// Merge the sharable webpack configurations with this file's, then export
module.exports = merge(baseConfig, config);
