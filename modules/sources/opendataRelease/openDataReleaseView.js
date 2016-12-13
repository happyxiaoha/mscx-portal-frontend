/**
 * Created by Administrator on 2016/12/12.
 */

'use strict';

var openDataReleaseContentView = require('./openDataReleaseContentView.js');
var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var openDataReleaseContentTemplate = require('html!./openDataReleaseContent.html');

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
                        url: '#dataview',
                        key: 'dataview'
                    },{
                        name: '数据目录',
                        url: '#datarelease',
                        key: 'datarelease'
                    }
                ]
            }
        });

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);
        this.$el.append(openDataReleaseContentTemplate);
         new openDataReleaseContentView({
            id: this.id
        });

    }
});


module.exports = openDataView;
