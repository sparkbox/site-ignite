var webpack = require('webpack');

module.exports = {
  entry: [
    './components/App.js'
  ],
  output: {
    path: __dirname,
    filename: "app.js"
  }, 
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
