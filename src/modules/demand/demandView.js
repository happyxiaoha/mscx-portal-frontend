'use strict';

// var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var dataView = require('./data/view.js');
var apiView = require('./api/view.js');
var serviceView = require('./service/view.js');
var apiEnvView = require('pioneering/apiEnvView.js');
var serverEnvView = require('pioneering/serverEnvView.js');

var navTemplate = require('./navTemplate.html');

var Resource = require('./resource.js');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    navTemplate: _.template(navTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.removeClass('boxShadiow bgWhite').addClass('grid1190 mt16');
        // this.leftMenuView = new leftMenuView({
        //     model: {
        //         className: 'demand',
        //         id: this.id,
        //         sideBars: Resource.maps
        //     }
        // });

        this.$el.empty();
        this.$el.append(this.navTemplate({
            id: this.id
        }));
        // this.$el.append(this.leftMenuView.$el);
        
        switch (this.id){
            case 'data':
                this.contentView = new dataView();
                break;
            case 'api':
                this.contentView = new apiView();
                break;
            case 'service':
                this.contentView = new serviceView();
                break;
            case 'apiEnv':
                this.contentView = new apiEnvView({
                    el: this.el
                });
                break;
            case 'serverEnv':
                this.contentView = new serverEnvView({
                    el: this.el
                });
                break;
            default:
                break;
        }
        
        this.$el.append(this.contentView.$el);

        return this;
    }
});

module.exports = view;