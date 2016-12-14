/**
 * Created by kevin on 2016/12/6.
 */

var header = require('../widget/indexHeaderWidget/headerView.js');
var footer = require('../widget/indexFooterWideget/footerView.js');
var mianView = require('../modules/main/mainView.js');
require('../css/base.css');

$(function() {
    new header();
    new footer();
    new mianView();
});