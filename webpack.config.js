var webpack = require('webpack');
var path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.[chunkhash].js'
  },
  devtool: 'sourcemap',
  mode: "production",
  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      'gitsubmodules-package-child': path.resolve(
        __dirname,
        'submodules/gitsubmodules-package-child/src/'
      )
    }
  },
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
          name: '[name]'
        }
      },
      {
        test: /.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["@babel/preset-react", ['@babel/preset-env', { modules: false }]],
          plugins: ['@babel/plugin-syntax-dynamic-import']
        }
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     cacheGroups: {
  //       vendors: false,
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/
  //       }
  //     }
  //   }
  // },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
}
