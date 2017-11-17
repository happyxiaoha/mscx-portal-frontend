/**
 * Created by Administrator on 2016/12/24.
 */

require('less/base.less');
var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');
var contactUsView = require('../modules/contactUs/contactUsView.js');

$(function() {
    new header({
      id: 'contactUs'
    });
    new footer();
    new contactUsView();

});