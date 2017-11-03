/**
 * Created by Administrator on 2016/12/12.
 */

'use strict';
var moreTemplate = require('./souceMore.html');
var openDataContentView = require('./openDataContentView.js');
var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var openDataTemplate = require('./openDataView.html');
var openDataThemeView = require('./openDataThemeView.js');

var openDataView = Backbone.View.extend({
    el: mscxPage.domEl.threeSourceEl,
    events: {
        'click a.showMore': 'toggleTheme'
    },
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'opendata',
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

        this.$el.append(openDataTemplate);
        this.$el.append(moreTemplate);
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
