/**
 * Created by Administrator on 2016/12/19.
 */
'use strict';
var searchTemplate = require('html!./search.html');

var searchApiModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/service/queryDataApi.do'
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
        'click .search-type span': 'changeType',
        'click .searchBtn': 'search'
    },
    initialize: function() {

        this.searchApiModel = new searchApiModel();
        this.searchDataModel = new searchDataModel();
        this.searchSerModel = new searchSerModel();

        this.listenTo( this.searchApiModel, 'sync', this.initApiResult);
        this.listenTo( this.searchDataModel, 'sync', this.initDataResult);
        this.listenTo( this.searchSerModel, 'sync', this.initSerResult);
        this.id = window.localStorage.getItem('keyword');
        this.dataType = window.localStorage.getItem('dataType') || 'Api';

        this.$el.html(this.template({'keyword': this.id,'dataType': this.dataType}));

        this.initView(this.dataType);
    },
    search: function () {
       var $searchInput = $('#searchValue'),
           $allSearch = $('.allSearch'),
           data = $.trim($allSearch.html());
           this.id = $.trim($searchInput.val());
        window.localStorage.setItem('keyword', this.id);
        this.initView(data);
    },
    initView: function(data){
        if(data == 'Api'){
            window.localStorage.setItem('dataType', 'Api');
            this.searchApiModel.fetch({
                data:{
                    keyword:　this.id
                }
            })
        }else if(data == '数据'){
            window.localStorage.setItem('dataType', '数据');
            this.searchDataModel.fetch({
                data:{
                    keyword:　this.id
                }
            })
        }else　{
            window.localStorage.setItem('dataType', '微服务');
            this.searchSerModel.fetch({
                data:{
                    keyword:　this.id
                }
            })
        }
    },
    changeType: function (e) {
        var $target = $(e.target),
            $allSearch = $('.allSearch'),
            $searchInput = $('#searchValue'),
            data = $target.data('type');
        $allSearch.html(data);
        $target.addClass('active').siblings().removeClass('active');
        $('.SearchList').eq($target.index()).show().siblings('.SearchList').hide();
        /*if(!this.keyword || this.keyword.length == 0){
            layer.tips('请输入需要搜索的关键字',$searchInput);
            //return false
        }*/
        this.initView(data);

    },
    initApiResult: function(res) {
        var pageInfo = res.toJSON().result.page,
            me = this;
        res = res.toJSON();
        new searchItemView({
            id: 'api',
            el:  '#apiResult ul',
            model: res.result.list
        });
        if(res.page){
            laypage({
                cont: $('#apiResult .Page'),
                skip: true,
                curr: pageInfo.currentPage || 1,
                pages: pageInfo.totalPage,
                jump: function(obj, first) {
                    if(!first) {
                        me.searchDataModel.fetch({
                            data:{
                                page: obj.curr,
                                keyword:　me.id
                            }
                        })
                    }
                }
            })
        }

    },
    initDataResult: function(res) {
        var pageInfo = res.toJSON().result.page,
            me = this;
        res = res.toJSON();
        new searchItemView({
            id: 'data',
            el:  '#dataResult ul',
            model: res.result.list
        });
       laypage({
            cont: $('#dataResult .Page'),
            skip: true,
            curr: pageInfo.currentPage || 1,
            pages: pageInfo.totalPage,
            jump: function(obj, first) {
                if(!first) {
                    me.searchDataModel.fetch({
                        data:{
                            page: obj.curr,
                            keyword:　me.id
                        }
                    })
                }
            }
        })
    },
    initSerResult: function(res) {
        var pageInfo = res.toJSON().result.page,
            me = this;
        res = res.toJSON();
        new searchItemView({
            id: 'ser',
            el:  '#serResult ul',
            model: res.result.list
        });
        laypage({
            cont: $('#serResult .Page'),
            skip: true,
            curr: pageInfo.currentPage || 1,
            pages: pageInfo.totalPage,
            jump: function(obj, first) {
                if(!first) {
                    me.searchSerModel.fetch({
                        data:{
                            page: obj.curr,
                            keyword:　me.id
                        }
                    })
                }
            }
        });
    }
});

module.exports = searchView;