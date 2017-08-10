require('ts-node/register');

import { resolve } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const commonConfig = {
  node: {
    __dirname: false
  },
  output: {
    path: resolve(__dirname, 'dist'),
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

const config = [
  {
    ...commonConfig,
    ...{
      target: 'electron-main',
      entry: { main: './electron/main.ts' }
    }
  },
  {
    ...commonConfig,
    ... {
      target: 'electron-renderer',
      entry: { gui: './src/main.ts' },
      plugins: [new HtmlWebpackPlugin()]
    }
  }
];

export default config;
