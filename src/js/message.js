/**
 * Created by Kevin on 2017/2/20.
 */
require('less/base.less');
require('message/message.less');
require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var messageView = require('message/messageView.js');

$(function() {
    new header();
    new footer();
    new messageView();
});