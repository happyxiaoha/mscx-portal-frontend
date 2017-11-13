'use strict';

var template = require('./leftMenu.html');
var _ = require('underscore');
require('./leftMenu.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'fl leftMenuWrap',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {

        this.$el.addClass(this.model.className).html(this.template(this.model));
        this.on('switch', this.switchTag);

        return this;
    },
    switchTag: function(tagName) {
      var activeIndex;
      _.find(this.model.sideBars, function(item, index) {
        if(item.key == tagName) {
          activeIndex = index;
          return;
        }
      })
      console.log(activeIndex)
      this.$el.find('a')
        .removeClass('active one')
        .eq(activeIndex)
        .addClass(activeIndex == 0 ? 'active one':'active');
    }
});

module.exports = view;