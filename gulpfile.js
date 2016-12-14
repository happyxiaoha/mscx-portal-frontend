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
    /*'login': '',*/
    /*'register': '',*/
    'main': './js/main.js',      //首页
     'sources': './js/sources.js',    //数据
    'api': './js/api.js',
        'services': './js/services.js',     //微服务
        /* 'demand': '',    */ //需求定制
    /* 'pioneering': '',  */  //创业园地
    'userInfo': './js/userInfo.js'      //用户中心
};

gulp.task('lint', function  () {
    gulp.src('./js/*.js')
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
    gulp.watch(['./js/underscore.js','./js/backbone.js','./js/ajaxBackboneManger.js'], ['backboneBuild']);
    gulp.watch(['modules/*/*.html','modules/*/*/*.html','widget/*/*.html','widget/*/*/*.html'], ['webpack']);
    gulp.watch(['modules/*/*.css','modules/*/*/*.css','widget/*/*.css','widget/*/*/*.css'], ['webpack']);
    gulp.watch(['modules/*/*.js','modules/*/*/*.js','widget/*/*.js','widget/*/*/*.js'], ['webpack']);
});


gulp.task('clean', function() {
    return gulp.src('build/', {
            read: false
        })
        .pipe(clean());
});
gulp.task('backboneBuild', function() {
    gulp.src(['./js/underscore.js','./js/backbone.js','./js/ajaxBackboneManger.js'])
        .pipe(concat('./backboneLib.js'))
        .pipe(gulp.dest('./build/dist'));
});

gulp.task('copy', function() {
    return gulp.src(['./css/**/*', './*.html', './lib/**/*'], {base: './'})
        .pipe(gulp.dest('build'));
});

gulp.task('build',['webpack'], function() {
    gulp.src(['./js/ie8fileLoader.js','./dist/common.js'])
        .pipe(concat('./common.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src('./dist/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist'));

    gulp.src('./dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default',['clean'], function() {
    gulp.start(['backboneBuild','webpack','watch']);
});