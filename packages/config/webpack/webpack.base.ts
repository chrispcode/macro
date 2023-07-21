import webpack from 'webpack';

const cwd = process.cwd();

export type ENV = {
  production: boolean;
}

function config(env: ENV): webpack.Configuration {
  const { production } = env;

  return {
    mode: (
      production 
      ? 'production' 
      : 'development'
    ),
    entry: cwd + '/src/index.tsx',
    output: {
      publicPath: 'auto',
      filename: 'index.js',
      path: cwd + '/build'
    },
    devServer: {
      static: cwd + '/build'
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
    }
  }
}

export default config;