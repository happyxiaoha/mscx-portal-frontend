'use strict';

var template = require('html!./applyTemplate.html');

// 套餐api
var packageModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/charge/getChargeRuleByServiceId.do'
});

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'apply-box hide',
    template: _.template(template, {variable: 'data'}),
    events: {
        'change .number': 'changeTdTotal',
        'click input[type="checkbox"]': 'selectPackage'
    },
    initialize: function() {
        this.packageModel = new packageModel();

        this.listenTo(this.packageModel, 'sync', this.render);
        this.on('caculate', this.caculate);

        this.packageModel.fetch({
            data: {
                apiServiceId: this.id
            }
        })
    },
    render: function() {
        this.$el.html(this.template(this.packageModel.toJSON()));
        this.trigger('caculate');
    },
    changeTdTotal: function(event) {
        var $target = this.$(event.currentTarget);
        var $tr = $target.parents('tr');
        var $number = $tr.find('.number');
        var num = $number.val();
        var price = $number.data('price');

        if(num < 0) {
            $target.val(0);
            num = 0;
        }

        $tr.find('.total').html(num * price);

        this.trigger('caculate');
    },
    selectPackage: function(event) {
        var $target = this.$(event.currentTarget);
        var $tr = $target.parents('tr');

        if(!$target[0].checked) {
            $tr.find('.number').val(0);
            $tr.find('.total').html(0);
        }else {
            $tr.find('.number').val(1).change();
        }

        this.trigger('caculate');
    },
    caculate: function() {
        var count = 0,
            totalPrice = 0;

        this.$el.find('td input[type="checkbox"]:checked').each(function(index, item) {
            var $tr = $(item).parents('tr'),
                $number = $tr.find('.number'),
                num = $number.val(),
                price = $number.data('price');

            count++;
            totalPrice += num * price;
        });

        this.$el.find('#selectedCount').html(count);
        this.$el.find('#totalPirce').html(totalPrice);
        
    }
});

module.exports = view;