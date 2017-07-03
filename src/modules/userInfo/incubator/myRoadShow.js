/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('./incubatorCommon.html');
var template = require('./incubator.html');
require('./incubator.css');

var myPublicRModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getRoadInfoByUserId.do'
});
var getPackageModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'charge/getMyChargeRuleByServiceId.do'
});


var incubatorView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
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
        this.model.fetch({pageSize:this.pagObj.pageSize,pageNum:this.pagObj.pageNum});
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
        this.$el.find('tbody').html(templates({publishRoadShowList:publishRoadShowList}));
        laypage({
            cont: 'myInPage',
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    }
});

module.exports = incubatorView;