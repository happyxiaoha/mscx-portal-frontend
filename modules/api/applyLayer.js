'use strict';

var template = require('html!./applyTemplate.html');

// 套餐api
var packageModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/charge/getChargeRuleByServiceId.do'
});

var view = Backbone.View.extend({
    tagName: 'div',
    id: 'applyBox',
    className: 'hide',
    template: _.template(template),
    events: {
        'change .number': 'changeTotal',
        'click input[type="checkbox"]': 'selectPackage'
    },
    initialize: function() {
        this.packageModel = new packageModel();

        this.listenTo(this.packageModel, 'sync', this.render);

        this.packageModel.fetch({
            data: {
                apiServiceId: this.id
            }
        })
    },
    render: function() {

    },
    changeTotal: function(event) {
        var $target = this.$(event.currentTarget);
        var $tr = $target.parents('tr');
        var num = $target.val();
        var price = $target.data('price');

        if(num < 0) {
            $target.val(0);
            num = 0;
        }

        $tr.find('.total').html(num * price);
    },
    selectPackage: function(event) {
        var $target = this.$(event.currentTarget);
        var $tr = $target.parents('tr');

        if($target[0].checked) {

        }else {
            $tr.find('.number').val(0);
        }
    }
});

module.exports = view;