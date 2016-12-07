/**
 * Created by kevin on 2016/12/6.
 */

var header = require('indexHeaderWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var mianView = require('main/mainView.js');

$(function() {
    new header();
    new footer();
    new mianView();
});