import 'webpack-dev-server';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { ModuleFederationPlugin } = webpack.container;

type Federation = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

export const federation: Federation = {
  name: 'core',
  filename: 'remoteEntry.js',
  remotes: {
    'navbar': 'navbar@http://localhost:3001/remoteEntry.js'
  },
};

const config = () => {
  return {
    extends: __dirname + '../../config/webpack/webpack.base.ts',
    devServer: {
      port: 3000
    },
    plugins: [
      new ModuleFederationPlugin(federation),
      new HtmlWebpackPlugin({
        template: __dirname + '../../config/public/index.html',
        favicon: __dirname + '../../config/public/favicon.ico',
      })
    ].filter(Boolean)
  } as webpack.Configuration
}

export default config;