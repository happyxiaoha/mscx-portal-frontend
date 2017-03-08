/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./leftSide.html');
require('./leftSide.css');

var applyApiListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'api/getSelfApiList.do'
});

var leftSideView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterLeft,
    events: {
    },
    page: 1,
    checkIsPhone: function () {
        this.myApiModel.fetch({
            data: {
                pageSize: 10,
                page: this.page
            }
        });
    },
    doCheck: function () {
        var aRes = this.myApiModel.get('result');
        console.log(aRes);
        if(aRes) {
            if(aRes.list.length > 0){
                for(var i = 0 ,len = aRes.list.length; i < len; i++) {
                    var obj = aRes.list[i],
                        sourceId = obj.sourceId;
                    if(sourceId == 9569) {
                        mscxPage.isPhoto = true;
                        break;
                    }
                }
            }
            mscxPage.isCheckPhone = true;
            this.render();
        }
        else {
            this.render();
        }
    },
    render: function () {
        var sName = this.name || '';
        this.$el.addClass('bod').html(_.template(template)({
            name: sName,
            isDisPhone: mscxPage.isPhoto
        }));
    },
    initialize: function(name) {
        this.name = name;
        var that = this;
        this.myApiModel = new applyApiListModel();
        this.myApiModel.on('change',function () {
            that.doCheck();
        });
        if(!mscxPage.isCheckPhone) {
            this.myApiModel.fetch({
                data: {
                    pageSize: 200010,
                    page: this.page
                }
            });
        }
        else {
            this.render();
        }
    }
});

module.exports = leftSideView;