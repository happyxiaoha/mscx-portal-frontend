var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename');
    // livereload = require('gulp-livereload');

var configRoot = {
    'login': './js/login.js',
    'register': './js/register.js',
    'main': './js/main.js',      //首页
    'sources': './js/sources.js',    //数据
    'api': './js/api.js',
    'services': './js/services.js',     //微服务
    'demand': './js/demand.js',     //需求定制
    'pioneering': './js/pioneering.js',  //创业园地
    'userInfo': './js/userInfo.js',    //用户中心
    'pay': './js/pay.js',
    'search': './js/search.js',
    'contactUs': './js/contactUs.js',
    'message': './js/message.js',
    'startup': './js/startup.js',
    'saas': './js/saas.js'
};

gulp.task('lint', function  () {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('webpack', function() {
    var webpackConfig = require('./webpack.config.js');
    webpackConfig.entry = configRoot;

    return gulp.src('')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./build/dist'));
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
    var source = gulp.src(['./js/underscore.js','./js/backbone.js','./js/ajaxBackboneManger.js'])
                .pipe(concat('./backboneLib.js'));

    if(process.env.NODE_ENV == 'production') {
        source.pipe(uglify());
    }

    return source.pipe(gulp.dest('./build/dist'));
});

gulp.task('copy', function() {
    var cssSource = gulp.src('./css/**/*.css', {base: './'}),
        jsSource = gulp.src('./lib/**/*.js', {base: './'});

    if(process.env.NODE_ENV == 'production') {
        cssSource.pipe(minifyCss());
        jsSource.pipe(uglify());
    }
    
    cssSource.pipe(gulp.dest('build'));
    jsSource.pipe(gulp.dest('build'));

    gulp.src(['./favicon.png', './*.html', './images/newicon/ic_newlogo.png', './images/apihelp/*', './images/serverHelp/*', './images/guidance/*'], {base: './'})
        .pipe(gulp.dest('build'));
});

gulp.task('prod', ['clean'], function() {
    process.env.NODE_ENV = 'production';
    gulp.start(['backboneBuild', 'webpack', 'copy']);
});

gulp.task('default',['clean'], function() {
    process.env.NODE_ENV = 'development';
    gulp.start(['backboneBuild','webpack', 'copy']);
});