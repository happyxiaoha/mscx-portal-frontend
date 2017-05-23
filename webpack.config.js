var webpack = require('webpack');
var path = require("path");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({name:'common',minChunks: 2});
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: { },
    output: {
        path: path.join(__dirname, './build/dist/'), //文件输出目录
        publicPath: './dist/',
        filename: '[name].js'
    },
    plugins: [commonsPlugin,new ExtractTextPlugin("[name].css"),new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },{
                            loader: "less-loader"
                        }
                    ],
                    publicPath: '../dist/'
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../dist/'
                })
            },
            {
                test: /\.(jpg|png|woff|ttf|svg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname),
            path.resolve(__dirname,'src'),
            path.resolve(__dirname,'src/modules'),
            path.resolve(__dirname,'src/widget')
        ],
        alias: {
            validate: 'src/lib/jquery.validate.js',
            formAjax: 'src/lib/jquery.form.js',
            util: 'src/lib/util.js',
            showdown: 'src/lib/showdown.js',
            customValidate: 'src/lib/additional-methods.js'
        },
        extensions: ['.js', '.css', '.less', '.json']
    }
};

