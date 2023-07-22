import 'webpack-dev-server';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { FederatedTypesPlugin } from '@module-federation/typescript';

const { ModuleFederationPlugin } = webpack.container;

type Federation = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

export const federation: Federation = {
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

const config = () => {
  return {
    extends: __dirname + '../../../config/webpack/webpack.base.ts',
    devServer: {
      port: 3001,
    },
    plugins: [
      new ModuleFederationPlugin(federation),
      new FederatedTypesPlugin({
        federationConfig: federation,
        typescriptFolderName: 'types',
        compiler: "tsc"
      }),
      new HtmlWebpackPlugin({
        template: __dirname + '../../../config/public/index.html',
        favicon: __dirname + '../../../config/public/favicon.ico',
      })
    ]
  } as webpack.Configuration
}

export default config;