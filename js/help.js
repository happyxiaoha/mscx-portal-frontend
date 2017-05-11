'use strict'

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('help/router.js');

$(function() {
    new header();
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);
    })
    Backbone.history.stop();
    Backbone.history.start();
});