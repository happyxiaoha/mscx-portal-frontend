/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./incubatorCommon.html');
var template = require('html!./myActivity.html');
var signListView = require('./signListLayer.js');
require('./incubator.css');
require('util');

var myPublicAModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getActivityByUserId.do'
});
var closeActivityModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/closeActivity.do'
});

var statusMes = ['审核通过','已关闭','审核中','审核拒绝','已删除','暂存'];

var activityView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .closeActivity': 'closeActivity',
        'click .sign-list': 'getSignList',
        'click .displayRes': 'disMsg'
    },
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'myActivity'}));
        this.$el.find('#incubatorInfo').html(template);
        this.model = new myPublicAModel();
        this.model.on('change',function () {
            that.render();
        });
        this.fetchPublic();
    },
    fetchPublic: function () {
        this.model.fetch({pageSize:this.pagObj.pageSize,pageNum:this.pagObj.pageNum});
    },
    render: function () {
        var that = this;
        var res = this.model.get('result');
        var publishActivityList = [], page = {};
        var templates = _.template($('#activityTemps').html());
        if(res){
            publishActivityList = res.list;
            var page = res.page || {totalPage:0,currentPage:0,totalPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        this.$el.find('tbody').html(templates({publishActivityList:publishActivityList,statusMes: statusMes}));
        laypage({
            cont: 'myActivityPage',
            pages: page.totalPage,
            skip: true,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.reloadPage();
                }
            }
        });
    },
    closeActivity: function (e) {
        var that = this;
        var sId = $(e.target).data('id');
        var deleteLayer = layer.confirm('确认要关闭吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new closeActivityModel().fetch({
                data: {
                    activityId: sId
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
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    getSignList: function(event) {
        var activityId = $(event.target).data('activityid');
        var me = this;

        this.signListView = new signListView({
            model: {
                activityId: activityId
            }
        });
        this.signListView.delegate = this;
        this.$el.append(this.signListView.$el);
        
        layer.open({
            type: 1,
            btn: ['确定','取消'],
            title: '<p class="ft22">报名列表</p>',
            shade: 0.6,
            shadeClose: true,
            area: ['500px', '450px'],
            content: this.signListView.$el,
            btn1: function (index) {
                layer.close(index);
            },
            btn2: function (index) {
                layer.close(index);
            },
            end: function() {
                me.signListView.remove();
            }
        })
    }
});

module.exports = activityView;