var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: config.entry,
    output: {
        path: resolve('./dist/'), //文件输出目录
        publicPath: '/',
        filename: 'js/[name].[chunkhash:8].js'
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
            '_': 'underscore',
            Backbone: 'backbone',
            mscxPage: resolve('src/lib/config'),
            layer: resolve('src/lib/layer/layer'),
            laypage: resolve('src/lib/laypage/laypage')
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
        })
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
                test: /\.(jpg|png|svg|gif)$/,
                loader: "url-loader",
                include: [resolve('src')],
                options: {
                    limit: 10000,
                    name: 'images/[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                include: [resolve('src')],
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.html$/,
                include: [resolve('src')],
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            resolve(''),
            resolve('src'),
            resolve('src/modules'),
            resolve('src/widget')
        ],
        alias: {
            validate: resolve('src/lib/jquery.validate.js'),
            formAjax: resolve('src/lib/jquery.form.js'),
            util: resolve('src/lib/util.js'),
            showdown: resolve('src/lib/showdown.js'),
            customValidate: resolve('src/lib/additional-methods.js'),
            moment: resolve('src/lib/datePicker/moment.js'),
            daterangepicker: resolve('src/lib/datePicker/daterangepicker.js')
        },
        extensions: ['.js', '.css', '.less', '.json']
    }
};

