/**
 * Created by Administrator on 2016/12/19.
 */
'use strict';
var searchTemplate = require('./search.html');

var searchApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/searchApi.do'
});
var searchItemView = require('./searchResultItem.js');

var searchDataModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getDataList.do'
});
var searchSerModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'list.do'
});
var searchSaaSModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'list.do'
});
var searchIncubatorModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'incubator/getIncubatorList.do'
});


var searchView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(searchTemplate,{variable: 'data'}),
    events: {
        'click .search-type span': 'changeType',
        'click .searchBtn': 'search',
        'keydown #searchValue': 'keyDownSearch'
    },
    initialize: function() {

        this.searchApiModel = new searchApiModel();
        this.searchDataModel = new searchDataModel();
        this.searchSerModel = new searchSerModel();
        this.searchSaaSModel = new searchSaaSModel();
        this.searchIncubatorModel = new searchIncubatorModel();
        

        this.listenTo( this.searchApiModel, 'sync', this.initApiResult);
        this.listenTo( this.searchDataModel, 'sync', this.initDataResult);
        this.listenTo( this.searchSerModel, 'sync', this.initSerResult);
        this.listenTo( this.searchSaaSModel, 'sync', this.initSaaSResult);
        this.listenTo( this.searchIncubatorModel, 'sync', this.initIncubatorResult);
        this.id = window.localStorage.getItem('keyword');
        this.dataType = window.localStorage.getItem('dataType') || 'API';

        this.$el.html(this.template({'keyword': this.id,'dataType': this.dataType}));

        this.initView(this.dataType);
    },
    keyDownSearch: function(e){
        var that = this;
        if (e.keyCode == "13") {
            //回车执行查询
            that.search();
        }
    },
    search: function () {
       var $searchInput = $('#searchValue'),
           $allSearch = $('.allSearch'),
           oldKey = window.localStorage.getItem('keyword'),
           data = $.trim($allSearch.html());
           this.id = $.trim($searchInput.val());
        if(oldKey === this.id) return;
        window.localStorage.setItem('keyword', this.id);
        this.initView(data);
    },
    initView: function(data){
        if(data == 'API'){
            window.localStorage.setItem('dataType', 'API');
            this.searchApiModel.fetch({
                data:{
                    keyword:　this.id
                }
            })
        }else if(data == '数据报告'){
            window.localStorage.setItem('dataType', '数据报告');
            this.searchDataModel.fetch({
                data:{
                    keyword:　this.id
                }
            })
        }else if(data == 'SaaS服务'){
            window.localStorage.setItem('dataType', 'SaaS服务');
            this.searchSaaSModel.fetch({
                data:{
                    keyword:　this.id
                }
            })
        }else if(data == '孵化器'){
            window.localStorage.setItem('dataType', '孵化器');
            this.searchIncubatorModel.fetch({
                data:{
                    keyword:　this.id
                }
            })
        }else　{
            window.localStorage.setItem('dataType', '微应用');
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
            data = $target.data('type');
        if($target.hasClass('active')) return;
        $allSearch.html(data);
        $target.addClass('active').siblings().removeClass('active');
        $('.SearchList').eq($target.index()).removeClass('hide').siblings('.SearchList').addClass('hide');
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
        if(res.result.page){
            laypage({
                cont: $('#apiResult .Page'),
                skip: true,
                curr: pageInfo.currentPage || 1,
                pages: pageInfo.totalPage,
                jump: function(obj, first) {
                    if(!first) {
                        me.searchApiModel.fetch({
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
        if(res.result.page) {
            laypage({
                cont: $('#dataResult .Page'),
                skip: true,
                curr: pageInfo.currentPage || 1,
                pages: pageInfo.totalPage,
                jump: function (obj, first) {
                    if (!first) {
                        me.searchDataModel.fetch({
                            data: {
                                page: obj.curr,
                                keyword: me.id
                            }
                        })
                    }
                }
            })
        }
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
        if(res.result.page) {
            laypage({
                cont: $('#serResult .Page'),
                skip: true,
                curr: pageInfo.currentPage || 1,
                pages: pageInfo.totalPage,
                jump: function (obj, first) {
                    if (!first) {
                        me.searchSerModel.fetch({
                            data: {
                                page: obj.curr,
                                keyword: me.id
                            }
                        })
                    }
                }
            });
        }
    },
    initSaaSResult: function(res) {
        var pageInfo = res.toJSON().result.page,
            me = this;
        res = res.toJSON();
        new searchItemView({
            id: 'saas',
            el:  '#saasResult ul',
            model: res.result.list
        });
        if(res.result.page) {
            laypage({
                cont: $('#saasResult .Page'),
                skip: true,
                curr: pageInfo.currentPage || 1,
                pages: pageInfo.totalPage,
                jump: function (obj, first) {
                    if (!first) {
                        me.searchSaaSModel.fetch({
                            data: {
                                page: obj.curr,
                                keyword: me.id
                            }
                        })
                    }
                }
            });
        }
    },
    initIncubatorResult: function(res) {
        var pageInfo = res.toJSON().result.page,
            me = this;
        res = res.toJSON();
        new searchItemView({
            id: 'incubator',
            el:  '#incubatorResult ul',
            model: res.result.list
        });
        if(res.result.page) {
            laypage({
                cont: $('#incubatorResult .Page'),
                skip: true,
                curr: pageInfo.currentPage || 1,
                pages: pageInfo.totalPage,
                jump: function (obj, first) {
                    if (!first) {
                        me.searchIncubatorModel.fetch({
                            data: {
                                page: obj.curr,
                                keyword: me.id
                            }
                        })
                    }
                }
            });
        }
    },
});

module.exports = searchView;