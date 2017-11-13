/**
 * Created by Administrator on 2016/12/12.
 */

'use strict';

var openDataContentView = require('./content.js');
var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var openDataTemplate = require('./wrapper.html');
var openDataThemeView = require('./theme.js');
var Resource = require('lib/resource.js');

var openDataView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'click a.showMore': 'toggleTheme'
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

        this.$el.append(openDataTemplate);
        new openDataThemeView();

        new openDataContentView();
    },
    toggleTheme: function(e) {
        var $target = $(e.target);

        if($target.hasClass('active')){
            $target.html('展开');
        }
        else {
            $target.html('收起');
        }
        $target.toggleClass('active');
        $('.liToTen').toggle(500);
    }
});


module.exports = openDataView;
