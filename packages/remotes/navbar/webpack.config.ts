import webpack from 'webpack';
import 'webpack-dev-server';

import FederatedTypesPlugin from '@module-federation/typescript';

const { ModuleFederationPlugin } = webpack.container;

type Env = {
  production?: boolean;
}

const config = (env: Env) => {
  return {
    extends: (
      env.production
        ? __dirname + '../../../../webpack/webpack.prod.ts'
        : __dirname + '../../../../webpack/webpack.dev.ts'
    ),
    devServer: {
      port: 3001,
      historyApiFallback: true,
      static: './dist',
    },
    plugins: [
      new ModuleFederationPlugin({
        library: { 
          type: 'var', 
          name: 'navbar'
        },
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
      }),
      new FederatedTypesPlugin({
        federationConfig: {
          library: { 
            type: 'var', 
            name: 'navbar'
          },
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
      })
    ]
  } as webpack.Configuration
} 
export default config;