import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const cwd = process.cwd();

export type ENV = {
  production: boolean;
  development: boolean;
}

function config(env: ENV): webpack.Configuration {
  const { development } = env;

  return {
    mode: (
      development 
      ? 'development'
      : 'production' 
    ),
    entry: cwd + '/src/index.tsx',
    output: {
      publicPath: 'auto',
      filename: '[name].[contenthash].bundle.js',
      path: cwd + '/build',
    },
    devServer: {
      hot: true,
      liveReload: false,
      static: cwd + '/build',
    },
    resolve: {
      extensions: [
        '.ts', '.tsx', '.js', '.json'
      ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [
                  development && ReactRefreshTypeScript()
                ].filter(Boolean),
              }),
              transpileOnly: development,
            },
          }
        }
      ]
    },
    plugins: [
      development && (
        new ReactRefreshWebpackPlugin({
          overlay: true
        })
      ),
      new HtmlWebpackPlugin({
        chunks: ['main'],
        template: __dirname + '/../public/index.html',
        favicon: __dirname + '/../public/favicon.ico',
      }),
    ].filter(Boolean)
  }
}

export default config;