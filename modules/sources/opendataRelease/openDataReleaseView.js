/**
 * Created by Administrator on 2016/12/12.
 */

'use strict';

var openDataReleaseContentView = require('./openDataReleaseContentView.js');
var leftMenuView = require('leftMenuWidget/leftMenuView.js');

var openDataView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
    },
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'citySdkLeft',
                id: this.id,
                sideBars: [
                    {
                        name: '数据视图',
                        url: '#view',
                        key: 'view'
                    },{
                        name: '数据目录',
                        url: '#catalog',
                        key: 'catalog'
                    }
                ]
            }
        });

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);

        this.contentView = new openDataReleaseContentView({
            id: this.id
        });

        this.$el.append(this.contentView.$el);
    }
});


module.exports = openDataView;
