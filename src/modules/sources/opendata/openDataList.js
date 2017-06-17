/**
 * Created by Administrator on 2016/12/12.
 */

'use strict';

var openDataListTemplate = require('./openDataList.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'common posRE',
    template: _.template(openDataListTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = view;