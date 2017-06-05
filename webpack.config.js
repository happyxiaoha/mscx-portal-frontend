var webpack = require('webpack');
var path = require("path");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({name:'common',minChunks: 2});
//PostCSS plugins
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(path.resolve(__dirname,'src/modules'));

module.exports = {
    entry: { },
    output: {
        path: path.join(__dirname, './build/dist/'), //文件输出目录
        publicPath: './dist/',
        filename: '[name].js'
    },
    plugins: [commonsPlugin,new ExtractTextPlugin("[name].css")
    ],
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader", {
                    publicPath: '../dist/'
                })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader", {
                    publicPath: '../dist/'
                })
            },
            {
                test: /\.(jpg|png|woff|ttf|svg|gif)$/,
                loader: "url?limit=10000"
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
            path.resolve(__dirname,'src/modules'),
            path.resolve(__dirname,'src/widget'),
            path.resolve(__dirname,'src')
        ],
        alias: {
            validate: 'src/lib/jquery.validate.js',
            formAjax: 'src/lib/jquery.form.js',
            util: 'src/lib/util.js',
            showdown: 'src/lib/showdown.js',
            customValidate: 'src/lib/additional-methods.js'
        },
        extensions: ['', '.js', '.css', '.less']
    }
};

