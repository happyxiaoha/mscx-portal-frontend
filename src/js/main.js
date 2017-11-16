/**
 * Created by kevin on 2016/12/6.
 */
require('css/swiper.css');
require('less/base.less');
require('main/main.less');
require('js/ajaxBackboneManger.js');

var header = require('widget/headerWidget/headerView.js');
var footer = require('widget/footerWidget/footerView.js');
var mainView = require('modules/main/mainView.js');

$(function() {
    new header();
    new footer();
    new mainView();
});