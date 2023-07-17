import webpack from 'webpack';
import 'webpack-dev-server';

import { FederatedTypesPlugin } from '@module-federation/typescript'

const { ModuleFederationPlugin } = webpack.container;

type Env = {
  production?: boolean;
}

const config = (env: Env) => {
  return {
    extends: (
      env.production
        ? __dirname + '../../../webpack/webpack.prod.ts'
        : __dirname + '../../../webpack/webpack.dev.ts'
    ),
    devServer: {
      port: 3000,
    },
    plugins: [
      new ModuleFederationPlugin({
        library: { 
          type: 'var', 
          name: 'core'
        },
        name: 'core',
        filename: 'remoteEntry.js',
        remotes: {
          'navbar': 'navbar@http://localhost:3001/remoteEntry.js'
        },
      }),
      new FederatedTypesPlugin({
        federationConfig: {
          library: { 
            type: 'var', 
            name: 'core'
          },
          name: 'core',
          filename: 'remoteEntry.js',
          remotes: {
            'navbar': 'navbar@http://localhost:3001/remoteEntry.js'
          },
        }
      })
    ]
  } as webpack.Configuration
} 
export default config;