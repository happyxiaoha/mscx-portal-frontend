'use strict'

require('less/base.less');
require('help/help.css');
require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('help/router.js');
var helpLeftSide = require('help/serviceHelpLeft.js');

$(function() {
    new header();
    new footer();
    mscxPage.views['helpLeftSideView'] = new helpLeftSide();
    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);
    });
    Backbone.history.stop();
    Backbone.history.start();
});