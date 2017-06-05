/**
 * Created by Administrator on 2016/12/24.
 */


var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var contactUsView = require('contactUs/contactUsView.js');

require('less/base.less');
require('contactUs/contactUs.less');

$(function() {
    new header();
    new footer();
    new contactUsView();

});