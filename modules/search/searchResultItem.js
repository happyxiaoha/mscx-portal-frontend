/**
 * Created by Administrator on 2016/12/20.
 */

'use strict';
var searchItemTemplate = require('html!./searchItem.html');


var searchView = Backbone.View.extend({
    template: _.template(searchItemTemplate,{variable: 'data'}),
    events: {
        'click .search-type span': 'changeType'
    },
    initialize: function() {
        debugger;
        this.$el.html(this.template({'type': this.id,'list': this.model}));
    }
});

module.exports = searchView;