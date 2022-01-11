const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry point of our app
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        // publicPath: '/build/',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    // mode: 'development',
    module: {
        rules: [
          {
            test: /\.jsx?/,  // conditional  '.js(x)'
            exclude: /node_modules/,
            loader: 'babel-loader', // if it meets a conditional run it..
            options: {
              presets: ['@babel/env', '@babel/react'],
            }
          },
          {
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ]
          }
        ]
    },
    // plugins: [new HtmlWebpackPlugin({template: 'index.html'})],
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        // static: {
        //   directory: path.resolve(__dirname, 'build'),
        //   publicPath: "/",
        // },
        compress: true,
        port: 8080,
        proxy: {
            '/api/leaders': 'http://localhost:3000',
        },
    },
};