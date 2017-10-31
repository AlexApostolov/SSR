module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        // REGEX to test against every file name included in the webpack project
        test: /\.js?$/,
        // Use the following webpack module--babel--to do the transpiling
        loader: 'babel-loader',
        // Tell babel to avoid certain directories
        exclude: /node_modules/,
        options: {
          // The actual rules used by babel to transpile the code
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  }
};
