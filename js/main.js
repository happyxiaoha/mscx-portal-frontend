/**
 * Created by kevin on 2016/12/6.
 */
require('./mockData.js');
var header = require('widget/headerWidget/headerView.js');
var footer = require('../widget/indexFooterWidget/footerView.js');
var mainView = require('../modules/main/mainView.js');
require('../css/base.css');

$(function() {
    new header();
    new footer();
    new mainView();
});