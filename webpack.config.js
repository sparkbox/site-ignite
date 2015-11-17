var path = require("path");
var webpack = require('webpack');
var componentPath = path.resolve('./components');

module.exports = {
  entry: [
    './components/App.js'
  ],
  output: {
    path: __dirname,
    filename: "app.js"
  }, 
  resolve: {
    root: componentPath,
  },
  "target": "atom",
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
