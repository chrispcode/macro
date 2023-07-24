import 'webpack-dev-server';
import webpack from 'webpack';

import { type ProxyConfigMap } from 'webpack-dev-server';

const { ModuleFederationPlugin } = webpack.container;

type Federation = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

export const federation: Federation = {
  name: 'core',
  filename: 'remoteEntry.js',
  remotes: {
    'navbar': 'navbar@/micro/navbar/remoteEntry.js'
  },
};

export const proxy: ProxyConfigMap = {
  '/macro/navbar': {
    target: 'http://localhost:3001',
    pathRewrite: { "^/macro/navbar": "" }
  }
}

const config = () => {
  return {
    extends: __dirname + '../../config/webpack/webpack.base.ts',
    devServer: {
      port: 3000,
      proxy,
    },
    plugins: [
      new ModuleFederationPlugin(federation),
    ].filter(Boolean)
  } as webpack.Configuration
}

export default config;