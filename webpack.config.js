'use strict'

let path = require( 'path' )
// Модуль Node.js path является встроенным и предоставляет набор функций для работы с путями в файловой системе.
const {CleanWebpackPlugin} = require( 'clean-webpack-plugin' )
// очищает неиспользуемые жс бандлы и другие наверно
const HTMLWebpackPlugin = require( 'html-webpack-plugin' )
// переносим хтмл в папку сборки и импортирует в него все что нужно

const CopyPlugin = require( 'copy-webpack-plugin' )


module.exports = {
   //mode: 'production',
   mode: 'development',
   //entry: './js/script.js',
   entry: './src/index.js',
   output: {
      //
      //path: __dirname + '/js'
      // __dirname - типо путь проекта
      path: path.resolve( __dirname, 'dist' ),
      filename: '[name].[hash].js'
   },

   resolve: {
      alias: {
         images: path.resolve( __dirname, 'src/assets/img/' )
      }
   },
   //watch: true,

   devtool: 'source-map',

   devServer: {
      port: 3000
      //historyApiFallback: true
   },

   module: {
      rules: [
         {
            test: /\.(css|less)$/i,
            use: ['style-loader', 'css-loader', 'less-loader']
         },
         {
            test: /\.(jpg|jpeg|png|svg)/,
            use: ['file-loader'],
         },
         {
            //test: /\.m?js$/,
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [['@babel/preset-env', {
                     debug: true,
                     corejs: 3,
                     useBuiltIns: 'usage'
                  }]]
               }
            }
         }
      ]
   },

   plugins: [
      new HTMLWebpackPlugin( {template: './src/index.html'} ),
      new CleanWebpackPlugin(),
      // new CopyPlugin( {
      //    patterns: [
      //       //{from: './src/img', to: 'dist'}
      //       {
      //          from: "**/*",
      //          to: "dist",
      //       }
      //       // {from: 'other', to: 'public'}
      //    ]
      // } )

   ]
}
