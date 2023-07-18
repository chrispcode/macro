import 'webpack-dev-server';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { FederatedTypesPlugin } from '@module-federation/typescript';

const { ModuleFederationPlugin } = webpack.container;

type Federation = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

const federation: Federation = {
  name: 'navbar',
  filename: 'remoteEntry.js',
  exposes: {
    "./components": "./src/components",
    "./bootstrap": "./src/bootstrap"
  },
  shared: {
    "react": {
      singleton: true,
    },
    "react-dom": {
      singleton: true,
    }
  }
}

const config = (env: { production: boolean }) => {
  return {
    extends: (
      env.production
        ? __dirname + '../../../../webpack/webpack.prod.ts'
        : __dirname + '../../../../webpack/webpack.dev.ts'
    ),
    devServer: {
      port: 3001,
      historyApiFallback: true,
    },
    plugins: [
      new ModuleFederationPlugin(federation),
      new FederatedTypesPlugin({
        typescriptFolderName: 'types',
        federationConfig: federation,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      })
    ]
  } as webpack.Configuration
}

export default config;