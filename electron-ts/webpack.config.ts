require('ts-node/register');

const path = require('path')

const commonConfig = {
  node: {
    __dirname: false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.json']
  }
}

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = [
  {
    ...commonConfig,
    ...{
      target: 'electron-main',
      entry: { main: './src/main.ts' }
    }
  },
  {
    ...commonConfig,
    ... {
      target: 'electron-renderer',
      entry: { gui: './src/gui.ts' },
      plugins: [new HtmlWebpackPlugin()]
    }
  }
];

export default config;
