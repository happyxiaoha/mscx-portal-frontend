/**
 * Created by Administrator on 2016/12/24.
 */

require('less/base.less');
var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var contactUsView = require('contactUs/contactUsView.js');

$(function() {
    new header();
    new footer();
    new contactUsView();

});