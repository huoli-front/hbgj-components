'use strict';
const path = require('path');
const utils = require("./utils");
const config = require('../config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vueLoaderConfig = require('./vue-loader.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
  context: resolve(""),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: `bundle-[hash].js`,
    chunkFilename: `[name]-[chunkHash].js`,
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  resolveLoader: {
    modules: [
      resolve("node_modules"),
      resolve("src/loaders")
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          fix: true,
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      // {
      //   test: /\.js$/,
      //   include: /src\/docs/,
      //   use: [
      //     {
      //       loader: "bundle-loader",
      //       options: {
      //         lazy: true
      //       }
      //     },
      //     { loader: "babel-loader" }
      //   ]
      // },
      // {
      //   test: /\.js$/,
      //   include: /examples/,
      //   resourceQuery: /prismjs/,
      //   use: [
      //     {
      //       loader: "bundle-loader",
      //       options: {
      //         lazy: true
      //       }
      //     },
      //     {
      //       loader: "prismjs-loader",
      //       options: {
      //         lang: "jsx"
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.md$/,
        loader: "markdown-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
