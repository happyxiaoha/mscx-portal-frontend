'use strict';

var template = require('html!./serviceHelpLeftTemplate.html');

var view = Backbone.View.extend({
    el: '.left-help-side',
    events: {
        'input input[type="text"]' : 'changeAttribute'
    },
    initialize: function(sname) {
        if(!sname) {
            return;
        }
        var menu = [
            {
            'key': 'apiHelp',
            'val' : 'API使用'
            },
            {
                'key': 'commonQue',
                'val' : '常见问题'
            },
            {
                'key': 'serHelp',
                'val' : '微应用使用'
            },
            {
                'key': 'newHelp',
                'val' : '新手指导'
            }
        ];
        this.$el.html(_.template(template)({menu: menu,name:sname}));
    }
});

module.exports = view;