/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var serviceDetailModelTemplate = require('html!./detailTemplate.html');
var shareView = require('shareWidget/shareView.js');

var serviceDetailModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'get.do'
});

var attentionModel = Backbone.Model.extend({   //关注
    url: mscxPage.request.app + 'attention/add.do'
});

var reAttentionModel = Backbone.Model.extend({   //取消关注
    url: mscxPage.request.app + 'attention/delete.do'
});

require('./services.css');
require('../../lib/jquery.SuperSlide.2.1.1.js');

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(serviceDetailModelTemplate,{variable: 'data'}),
    events: {
        'click #attention': 'attentionData',
        'click #example': 'showExample'
    },
    initialize: function() {
        this.$el.html();
        this.$el.toggleClass('loading');
        this.model = new serviceDetailModel();
        this.model.fetch({
            data: {
                id: this.id
            }
        });
        this.shareView = new shareView();
        this.attentionDataModel = new attentionModel();
        this.removeAttentionModel = new reAttentionModel();
        this.listenTo(this.attentionDataModel, 'sync', this.handleAttention);
        this.listenTo(this.removeAttentionModel, 'sync', this.handlereAttention);

        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;
        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.model.toJSON().result));
        this.$appInfoCons = this.$('.share');
        this.$appInfoCons.html(this.shareView.$el);
        $(".picScroll-left").slide({
            titCell:".hd ul",
            mainCell:".bd ul",
            autoPage:true,
            effect:"left",
            autoPlay:false,
            vis:2,
            trigger:"click"
        });
    },
    handleAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.status == 'OK'){
            that.nJson.attentionFlag = true;
            $('#attention').html('取消关注').addClass('have-attention');
        }

        layer.msg('关注成功');
    },
    handlereAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.status == 'OK') {
            $('#attention').html('关注').removeClass('have-attention');
            this.nJson.attentionFlag = false;
        }
        layer.msg('取消关注成功');
    },
    attentionData: function(){
        if(this.nJson.attentionFlag){
            this.removeAttentionModel.fetch({
                data:{id: this.id}
            })
        }
        else{
            this.attentionDataModel.fetch({
                data:{id: this.id}
            })
        }
    },
    showExample: function () {
        var that =this;
        layer.open({
            type: 2,
            title: that.nJson.name+'演示',
            shadeClose: false,
            maxmin: true,
            shade: 0.8,
            area: ['500px', '500px'],
            content: that.nJson.demoUri //iframe的url
        });
    }
});


module.exports = openDataDetailView;
