/**
 * Created by Administrator on 2016/12/12.
 */

'use strict';

var openDataReleaseContentView = require('./content.js');
var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('lib/resource.js');

var openDataView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
    },
    initialize: function() {
        this.$el.addClass('grid1000 mt30');
        this.leftMenuView = new leftMenuView({
            model: {
                id: this.id,
                className: 'data',
                sideBars: Resource.maps
            }
        })

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);

        this.contentView = new openDataReleaseContentView({
            id: this.id,
            model: this.model || {}
        });

        this.$el.append(this.contentView.$el);
    }
});


module.exports = openDataView;
