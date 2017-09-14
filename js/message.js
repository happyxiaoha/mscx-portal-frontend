/**
 * Created by Kevin on 2017/2/20.
 */
require('./mockData.js');
var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');
var messageView = require('../modules/message/messageView.js');

$(function() {
    new header();
    new footer();
    new messageView();
});