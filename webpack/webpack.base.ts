import webpack from 'webpack';

const cwd = process.cwd();

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    publicPath: 'auto',
    filename: 'index.js',
    path: cwd + '/build'
  },
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
};

export default config;