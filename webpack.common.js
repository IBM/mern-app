/*
 © Copyright IBM Corp. 2018
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const WebpackPluginPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CopyWebpackPluginConfig= new CopyWebpackPlugin([
  { from: './client/default.css', to: path.resolve(__dirname, 'public') },
  { from: './client/404.html', to: path.resolve(__dirname, 'public') },
  { from: './client/500.html', to: path.resolve(__dirname, 'public') }
]);

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'js/bundle.[hash].js',
    path: path.resolve(__dirname, 'public')
  },
  module : {
    rules : [
      {
          test    : /\.jsx?$/,
          exclude : /node_modules/,
          loader  : 'babel-loader',
		  options: {
			presets: ['@babel/react', '@babel/preset-env'],
			babelrc: false
		  }
      },
      {
          test    : /\.css?/,
          loader  : 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    WebpackPluginPluginConfig,
    CopyWebpackPluginConfig
  ]
};
