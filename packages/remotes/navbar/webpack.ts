import 'webpack-dev-server';
import webpack from 'webpack';
// import { FederatedTypesPlugin } from '@module-federation/typescript';
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/webpack';

const { ModuleFederationPlugin } = webpack.container;

type Federation = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

export const federationConfig: Federation = {
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

const webpackConfig = () => {
  return {
    extends: __dirname + '../../../config/webpack/webpack.base.ts',
    devServer: {
      port: 3001,
    },
    plugins: [
      new ModuleFederationPlugin(federationConfig),
      NativeFederationTypeScriptRemote({
        moduleFederationConfig: federationConfig,
        typesFolder: 'types',
      }),
    ]
  } as webpack.Configuration
}

export default webpackConfig;