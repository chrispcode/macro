import webpack from 'webpack';

const cwd = process.cwd();

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: cwd + '/dist'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
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