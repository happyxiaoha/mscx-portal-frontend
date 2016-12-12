'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var contentView = require('./contentView.js');
require('./api.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'api',
                id: this.id,
                sideBars: [
                    {
                        name: '数据API',
                        url: '#data',
                        key: 'data'
                    },{
                        name: '工具API',
                        url: '#tool',
                        key: 'tool'
                    },{
                        name: '模型API',
                        url: '#model',
                        key: 'model'
                    }
                ]
            }
        });

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);
        
        this.contentView = new contentView({
            id: this.id
        });

        this.$el.append(this.contentView.$el);

        return this;
    }
});

module.exports = view;