var path = require('path');
var TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

var configFilePath = path.resolve(__dirname, 'tsconfig.json');

var config = {
  mode: 'production',
  entry: [path.resolve(__dirname, './src/index.tsx')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: configFilePath })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: configFilePath },
          },
        ],
        exclude: /(node_modules|__tests__)/,
      },
    ],
  },
};

module.exports = config;