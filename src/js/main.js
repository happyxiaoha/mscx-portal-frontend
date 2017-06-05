/**
 * Created by kevin on 2016/12/6.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var mainView = require('main/mainView.js');

require('less/base.less');
require('main/main.less');

$(function() {
    new header({
        id: 'index'
    });
    new footer();
    new mainView();
});