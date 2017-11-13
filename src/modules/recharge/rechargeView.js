'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var phoneTemplate = require('./phoneTemplate.html');
var smsTemplate = require('./smsTemplate.html');
var flowTemplate = require('./flowTemplate.html');
var refuelTemplate = require('./refuelTemplate.html');
var Resource = require('./resource.js');

var photoView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'click .tabs a': 'toggleTab'
    },
    initialize: function() {

        switch (this.id) {
            case 'phone':
                this.template = phoneTemplate;
                break;
            case 'sms':
                this.template = smsTemplate;
                break;
            case 'flow':
                this.template = flowTemplate;
                break;
            case 'refuel':
                this.template = refuelTemplate;
                break;
            default:
                this.template = phoneTemplate;
                break;
        }

        this.$el.addClass('grid1000 mt30');
        this.leftMenuView = new leftMenuView({
            model: {
                id: this.id,
                className: 'recharge',
                sideBars: Resource.maps
            }
        })

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);

        this.$el.append(this.template);
    },
    toggleTab: function(event) {
        var $target = this.$(event.currentTarget);
        var activeIndex = $target.data('index');

        this.$('.tabs span').removeClass('active');
        $target.parent().addClass('active');
        this.$('.content-item').removeClass('active').eq(activeIndex).addClass('active');
    }
});


module.exports = photoView;
