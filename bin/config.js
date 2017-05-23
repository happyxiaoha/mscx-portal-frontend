var path = require('path')

module.exports = {
  dev: {
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'build',
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
