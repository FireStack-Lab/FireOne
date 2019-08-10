const webpack = require('webpack');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './dist/index.js',
  devtool: 'source-map',
  target: 'web',
  output: {
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        // loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-env'],
        //   plugins: ['@babel/plugin-transform-runtime'],
        // },
        //},
      },
    ],
  },
  resolve: {
    modules: ['../../node_modules'],
    symlinks: true,
    extensions: ['.js'],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(mode),
    }),
  ],
  mode,
};
