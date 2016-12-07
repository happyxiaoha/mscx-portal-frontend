var webpack = require('webpack');
var path = require("path");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
//PostCSS plugins
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: { main: './js/main.js'},
    output: {
        path: path.join(__dirname, '../dist/'), //文件输出目录
        publicPath: './../dist/',
        filename: '[name].js',
        chunkFilename: "[name].page.js"
    },
    plugins: [commonsPlugin,new ExtractTextPlugin("[name].css")
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(jpg|png|woff|ttf|svg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: [
        autoprefixer({browsers: ['last 2 versions', "> 1%"]})
    ],
    resolve: {
        root: [
            path.resolve(__dirname),
            path.resolve(__dirname,'modules'),
            path.resolve(__dirname,'widget')
        ],
        alias: {
            validate: 'js/jquery.validate.js'
        },
        extensions: ['', '.js', '.css']
    }
};

