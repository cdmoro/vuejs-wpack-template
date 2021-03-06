var path = require('path')
var webpack = require('webpack')
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// var UglifyJSPlugin = require('uglify-es')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  //entry: ['./src/main.js', './src/app.css'],
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['node_modules/vue-particles'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]'
        }
      },
      { // regular css files
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // { // sass / scss loader for webpack
      //   test: /\.(sass|scss)$/,
      //   loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      // }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new MinifyPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}