/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./incubatorCommon.html');
var template = require('html!./incubator.html');
require('./incubator.css');
require('util');

var myPublicRModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getRoadInfoByUserId.do'
});
var closeModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/closeRoadByRoadId.do'
});

var statusMes = ['审核通过','已关闭','审核中','审核拒绝','已删除','暂存'];

var incubatorView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .closeRoadShow': 'closeRoadShow',
        'click .displayRes': 'disMsg'
    },
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'myIncubator'}));
        this.$el.find('#incubatorInfo').html(template);
        this.model = new myPublicRModel();
        this.model.on('change',function () {
            that.render();
        });
        this.fetchPublic();
    },
    fetchPublic: function () {
        this.model.fetch({data:{pageSize:this.pagObj.pageSize,page:this.pagObj.pageNum}});
    },
    render: function () {
        var that = this;
        var res = this.model.get('result');
        var publishRoadShowList = [], page = {};
        var templates = _.template($('#incubatorTemps').html());
        if(res){
            publishRoadShowList = res.list;
            var page = res.page || {totalPage:0,currentPage:0,totalPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        this.$el.find('tbody').html(templates({publishRoadShowList:publishRoadShowList,statusMes: statusMes}));
        laypage({
            cont: 'myInPage',
            pages: page.totalPage,
            skip: true,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.fetchPublic();
                }
            }
        });
    },
    closeRoadShow: function (e) {
        var that = this;
        var sId = $(e.target).data('id');
        var deleteLayer = layer.confirm('确认要关闭吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new closeModel().fetch({
                data: {
                    roadId: sId
                },
                success: function () {
                    layer.msg('关闭成功!');
                    that.fetchPublic();
                }
            });
            layer.close(deleteLayer);
        }, function(){
            layer.close(deleteLayer);
        });

    },
    disMsg: function (e) {
        var mes = $(e.target).data('msg');
        layer.alert(mes,{title:'拒绝原因'});
        return false;
    }
});

module.exports = incubatorView;