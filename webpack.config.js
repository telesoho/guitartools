var webpack = require('webpack');
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var libraryName = 'guitartools';
var env = process.env.WEBPACK_ENV;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const ASSETS_PATH = path.resolve(ROOT_PATH, 'assets');

// Create multiple instances
const extractCSS = new ExtractTextPlugin('guitartools-css.css');
const extractSCSS = new ExtractTextPlugin('guitartools-scss.css');

var plugins = [extractCSS, extractSCSS];
if (env !== 'dev') {
    plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        })
    );
}

module.exports = {
    entry: './src/' + libraryName + '.js',

    output: {
        path: BUILD_PATH,
        filename: libraryName + '.min.js',
        publicPath: '/assets/',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    devtool: 'source-map',

    devServer: {
        publicPath: "/dist/",
        
        compress: false,
        port: 8080
    },

    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: APP_PATH
            },
            {
                test: /\.css$/,
                include: ASSETS_PATH,
                use: extractCSS.extract([
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ])
            },
            {
                test: /\.scss$/i,
                include: ASSETS_PATH,
                use: extractSCSS.extract([
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]),
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000'
            },
            {
                test: /\.(mp3|webm|wav|ogg|mp4|aac|m4a|flac)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '/assets/[hash].[ext]'
                    }
                  }
                
            }
        ]
    },

    plugins: plugins
};