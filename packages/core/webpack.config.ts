import webpack from 'webpack';
import 'webpack-dev-server';
import { NativeFederationTypeScriptHost } from '@module-federation/native-federation-typescript/webpack'
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
      NativeFederationTypeScriptHost({
        deleteTypesFolder: true,
        moduleFederationConfig: {
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