var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    webpackConfig = require('./webpack.config.js');

var configRoot = {
    'login': './src/js/login.js',
    'register': './src/js/register.js',
    'main': './src/js/main.js',      //首页
    'sources': './src/js/sources.js',    //数据
    'api': './src/js/api.js',
    'services': './src/js/services.js',     //微服务
    'demand': './src/js/demand.js',     //需求定制
    // 'pioneering': './js/pioneering.js',  //创业园地
    'userInfo': './src/js/userInfo.js',    //用户中心
    'pay': './src/js/pay.js',
    'message': './src/js/message.js',
    'search': './src/js/search.js',
    'contactUs': './src/js/contactUs.js',
    'saas': './src/js/saas.js'
};

gulp.task('lint', function  () {
    gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('webpack', function() {
    webpackConfig.entry = configRoot;
    gulp.src('')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./build/dist'));

    gulp.start(['copy']);
});
gulp.task('watch', function () {
    gulp.watch(['./src/js/underscore.js','./src/js/backbone.js','./src/js/ajaxBackboneManger.js'], ['backboneBuild']);
    gulp.watch(['src/modules/**/*.html','src/widget/**/*.html'], ['webpack']);
    gulp.watch(['src/modules/**/*.css','src/widget/**/*.css'], ['webpack']);
    gulp.watch(['src/modules/**/*.js','src/widget/**/*.js'], ['webpack']);
    gulp.watch(['src/less/**/*.less','src/modules/**/*.less','src/widget/**/*.less'], ['webpack']);

});


gulp.task('clean', function() {
    return gulp.src('build/', {
            read: false
        })
        .pipe(clean());
});
gulp.task('backboneBuild', function() {
    gulp.src(['./src/js/underscore.js','./src/js/backbone.js','./src/js/ajaxBackboneManger.js'])
        .pipe(concat('./backboneLib.js'))
        .pipe(gulp.dest('./build/dist'));
});

gulp.task('copy', function() {
    gulp.src(['./favicon.ico','./webapp/**/*', './*.html'], {base: './'})
        .pipe(gulp.dest('build'));
    return gulp.src(['./src/css/**/*', './src/lib/**/*', './src/images/newicon/ic_newlogo.png', './src/images/logo/*', './src/images/apihelp/*', './src/images/servicehelp/*', './src/images/guidance/*'], {base: './src/'})
        .pipe(gulp.dest('build'));
});

gulp.task('default',['clean'], function() {
    gulp.start(['backboneBuild','webpack','watch']);
});