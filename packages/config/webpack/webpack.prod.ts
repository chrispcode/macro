import webpack from 'webpack';

const config: webpack.Configuration = {
  extends: __dirname + '/webpack.base.ts',
  mode: 'production'
}

export default config;