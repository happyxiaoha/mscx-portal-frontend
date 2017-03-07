/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var detailTemplate = require('html!./detailTemplate.html');
// var selectedView = require('./selectedSaasView.js');

var dataDetailModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'get.do'
});

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(detailTemplate,{variable: 'data'}),
    initialize: function() {
        this.$el.html();
        this.$el.toggleClass('loading');
        this.model = new dataDetailModel();
        this.model.fetch({
            data: {
                id: this.id
            }
        });
        this.shareView = new shareView();
        // this.selectedView = new selectedView();

        this.attentionDataModel = new attentionModel();
        this.removeAttentionModel = new reAttentionModel();
        this.listenTo(this.attentionDataModel, 'sync', this.handleAttention);
        this.listenTo(this.removeAttentionModel, 'sync', this.handlereAttention);

        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.nJson ));
        this.$appInfoCons = this.$('.share');
        // 热门微服务区域
        this.$selectedService = this.$('#selectedService');

        this.$appInfoCons.html(this.shareView.$el);

        // this.$selectedService.append(this.selectedView.$el).addClass('in');

        this.resourceType = this.nJson.resourceType;
        this.chargeType = this.nJson.chargeType;

        if(this.nJson){
         if(this.nJson.demoImage1 && this.nJson.demoImage2) {
            this.$el.find('.next').show();
            this.$el.find('.prev').show();

            $(".picScroll-left").slide({
                // titCell: ".hd ul",
                mainCell: ".bd ul",
                autoPage: true,
                effect: "left",
                autoPlay: false,
                vis: 1,
                trigger: "click"
            });
        }
        }
    },
    handleAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.status == 'OK'){
            that.nJson.attentionFlag = true;
            $('#attention').html('取消关注')
        }

        layer.msg('关注成功');
    },
    handlereAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.status == 'OK') {
            $('#attention').html('关注')
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
        var that =this,
            url = that.nJson.demoUri;
        if(url.indexOf('http') < 0){
            url = 'http://' + url
        }
        layer.open({
            type: 2,
            title: that.nJson.name+'演示',
            shadeClose: false,
            maxmin: true,
            shade: 0.8,
            area: ['500px', '500px'],
            content: url //iframe的url
        });
    }
});


module.exports = openDataDetailView;
