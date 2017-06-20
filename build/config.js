var path = require('path')

module.exports = {
  build: {
    env: 'production',
    // index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '/',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: 'development',
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: '/',
    assetsPublicPath: '/',
    proxyTable: {
        '**/*.do': {
            target: 'http://mscx-portal.eastdc.cn:85',
            changeOrigin: true
        },
        '/static_html': {
            target: 'http://mscx-portal.eastdc.cn:85',
            changeOrigin: true
        }
    },
    cssSourceMap: false
  },
  entry: {
        login: './src/js/login.js',
        register: './src/js/register.js',
        main: './src/js/main.js',      //首页
        sources: './src/js/sources.js',    //数据
        api: './src/js/api.js',
        services: './src/js/services.js',     //微服务
        demand: './src/js/demand.js',     //需求定制
        userInfo: './src/js/userInfo.js',    //用户中心
        pay: './src/js/pay.js',
        message: './src/js/message.js',
        search: './src/js/search.js',
        contactUs: './src/js/contactUs.js',
        saas: './src/js/saas.js'
    }
}