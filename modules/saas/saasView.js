/**
 * Created by Administrator on 2016/12/14.
 */
'use strict';

var contentView = require('./contentView.js');
require('./saas.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    initialize: function() {
        this.$el.addClass('grid1190');

        this.$el.empty();

        this.contentView = new contentView({
            id: this.id,
            model: this.model || {}
        });

        this.$el.append(this.contentView.$el);

        return this;
    }
});

module.exports = view;