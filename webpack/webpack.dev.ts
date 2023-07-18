import webpack from 'webpack';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  extends: __dirname + '/webpack.base.ts',
  mode: 'development',
  devServer: {
    static: './build'
  }
}

export default config;