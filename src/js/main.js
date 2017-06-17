/**
 * Created by kevin on 2016/12/6.
 */

require('css/swiper.css');
require('less/base.less');
require('main/main.less');

require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var mainView = require('main/mainView.js');

$(function() {
    new header({
        id: 'index'
    });
    new footer();
    new mainView();
});