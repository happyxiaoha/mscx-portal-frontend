/**
 * Created by Administrator on 2016/12/19.
 */
'use strict';
var searchTemplate = require('html!./search.html');

var searchApiModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/queryDataApi.do'
});
var searchItemView = require('./searchResultItem.js');

var searchDataModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-data-api/getDataList.do'
});
var searchSerModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-app-api/list.do'
});

var searchView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(searchTemplate,{variable: 'data'}),
    events: {
        'click .search-type span': 'changeType'
    },
    initialize: function() {

        this.searchApiModel = new searchApiModel();
        this.searchDataModel = new searchDataModel();
        this.searchSerModel = new searchSerModel();

        this.listenTo( this.searchApiModel, 'sync', this.initApiResult);
        this.listenTo( this.searchDataModel, 'sync', this.initDataResult);
        this.listenTo( this.searchSerModel, 'sync', this.initSerResult);
        this.$el.html(this.template());
    },
    changeType: function (e) {
        var $target = $(e.target),
            $allSearch = $('.allSearch'),
            $searchInput = $('#searchValue'),
            data = $target.data('type');
        this.keyWord = $.trim($searchInput.val());
        $allSearch.html(data);
        $target.addClass('active').siblings().removeClass('active');
        $('.SearchList').eq($target.index()).show().siblings('.SearchList').hide();
        if(!this.keyWord || this.keyWord.length == 0){
            layer.tips('请输入需要搜索的关键字',$searchInput);
            //return false
        }

        if(data == 'Api'){
            this.searchApiModel.fetch({
                data:{
                    keyWord:　this.keyWord
                }
            })
        }else if(data == '数据'){
            this.searchDataModel.fetch({
                data:{
                    keyWord:　this.keyWord
                }
            })
        }else　{
            this.searchSerModel.fetch({
                data:{
                    keyWord:　this.keyWord
                }
            })
        }
    },
    initApiResult: function(res) {
        var pageInfo = res.result.page,
            me = this;
        new searchItemView({
            el: '#apiResult',
            model: res.list
        });
    },
    initDataResult: function(res) {
        var pageInfo = res.toJSON().result.page,
            me = this;
        res = res.toJSON();
        new searchItemView({
            id: 'data',
            el: el,
            model: res.result.list
        });
       laypage({
            cont: $('#dataResult .Page'),
            skip: true,
            curr: pageInfo.currentPage || 1,
            pages: pageInfo.totalPage,
            jump: function(obj, first) {
                if(!first) {
                    this.searchDataModel.fetch({
                        data:{
                            page: obj.curr,
                            keyWord:　me.keyWord
                        }
                    })
                }
            }
        })
    },
    initSerResult: function(res) {
        new searchItemView({
            model: res.result
        })
    }
});

module.exports = searchView;