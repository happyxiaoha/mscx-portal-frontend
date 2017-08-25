var webpack = require('webpack');
var path = require("path");
var utils = require('./utils');
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('../config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: config.entry,
    output: {
        path: resolve('./dist/'), //文件输出目录
        publicPath: '/',
        filename: 'js/[name].[hash:8].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename: 'js/common.js',
            minChunks: 2
        }),
        new ExtractTextPlugin("css/[name].[contenthash:8].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Base64: resolve('src/lib/base64'),
            layer: resolve('src/lib/layer/layer'),
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: '首页',
            filename: 'index.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'main'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '登录',
            filename: 'login.html',
            template: 'src/ejs/login.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'login'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '注册',
            filename: 'register.html',
            template: 'src/ejs/register.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'register'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: 'API',
            filename: 'api.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'api'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '联系我们',
            filename: 'contactUs.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'contactUs'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '需求定制',
            filename: 'demand.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'demand'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '消息管理',
            filename: 'message.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'message'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '支付',
            filename: 'pay.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'pay'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: 'SaaS服务',
            filename: 'saas.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'saas'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '查询',
            filename: 'search.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'search'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '微应用',
            filename: 'services.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'services'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '用户中心',
            filename: 'userInfo.html',
            template: 'src/ejs/userInfo.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'userInfo'],
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            title: '帮助中心',
            filename: 'help.html',
            template: 'src/ejs/index.ejs',
            inject: true,
            chunks: ["manifest", "vendor", "common", 'help'],
            chunksSortMode: 'dependency'
        }),
    ],
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [resolve('src/modules'), resolve('src/widget'), resolve('src/js')],
            //     exclude: /node_modules/,
            //     options: {
            //       formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.less$/,
                include: [resolve('src')],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },{
                            loader: "less-loader"
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
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
    resolve: {
        modules: [
            'node_modules',
            resolve(''),
            resolve('src'),
            resolve('src/components'),
            resolve('src/modules'),
            resolve('src/widget')
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            util: resolve('src/lib/util.js'),
            showdown: resolve('src/lib/showdown.js')
        },
        extensions: ['.js', '.vue', '.less', '.json']
    }
};

