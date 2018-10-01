const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const bundlePath = path.resolve(__dirname, 'dist')
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

console.log("bundelpaths", bundlePath)
const nameApp = path.resolve("package.json").name;

module.exports = {
    entry: "./src/index.js",
    resolve: { extensions: ['.js', '.jsx'] },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({ 
            template: './public/index.html',
             title: `app${nameApp}` }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
            publicPath: '/',
            path: path.join( __dirname, '/dist'),
            chunkFilename: '[name].chunk.js',
            filename: '[name].bundle.js'
        },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
              test: /\.less$/,
              use: [
                {loader: "style-loader"},
                {loader: "css-loader"},
                {loader: "less-loader",
                  options: {
                    modifyVars: themeVariables
                  }
                }
              ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
};