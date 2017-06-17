/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('./orderCommon.html');
var shopTemplate = require('./shop.html');
require('./orders.css');
require('util');

var shopCarListModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'shopping/cart/user/query.do'
});
var updateShopModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'shopping/cart/user/modify/times.do'
});
var deleteShopModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'shopping/cart/user/delete.do'
});
var getOrderIdModel = Backbone.Model.extend({
    url:  'order/cart/placeOrder.do'
});

var shopCarView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .next-page': 'changePage',
        'click .prev-page': 'changePage',
        'click .select-all': 'toggleSelectAll',
        'click .is-select-shop': 'toggleSelectCar',
        'blur .apply-times': 'changePrice',
        'click .deleteCar': 'deleteCar',
        'click .toShopPay': 'toPay'
    },
    shopObj:{},
    shopArray: [],
    initialize: function() {
        var that = this;
        this.$el.html(_.template(commonTemplate)({name:'shop'}));
        this.model = new shopCarListModel();
        this.model.on('change',function () {
            that.renderCarArea();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum,
                t: new Date().getTime()
            }
        });
        this.render();
    },
    renderCarArea: function () {
        var res = this.model.get('result') || {list:[],page:null},
            shopCarList= res.list,
            page = res.page || {},
            shopCarTemplate = _.template(this.$el.find('#carMessage').html());
        this.pagObj.pageNum = page.currentPage || 1;
        this.pagObj.totalPage = page.totalPage || 1;
        this.$el.find('.shopCar').html(shopCarTemplate({shopCarList:shopCarList}));
        this.renderPage();
        this.renderTotal();
    },
    changePage: function (e) {
        var $this = $(e.target),
            isDisable = $this.hasClass('disabled'),
            isNext = $this.hasClass('next-page');
        if(isDisable){
            return false;
        }
        if(isNext){
            this.pagObj.pageNum ++;
        }
        else {
            this.pagObj.pageNum --;
        }
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        return false;
    },
    changePrice: function (e) {
        var $this = $(e.target),
            $li = $this.closest('li'),
            $checkBox = $li.find('input[type="checkbox"]'),
            isChecked = $checkBox.is(":checked"),
            sId = $li.attr('attrid'),
            sVal = $.trim($this.val()),
            that = this;
        if(!isChecked){
            $checkBox[0].checked = true;
        }
        if(isNaN(sVal)) {
            layer.alert('申请套餐数量必须为数字!',{icon:2});
            $this.val(this.shopObj[sId].num);
            return false;
        }
        else if(sVal < 1) {
            layer.alert('申请套餐数量不能小于1!',{icon:2});
            $this.val(this.shopObj[sId].num);
            return false;
        }
        new updateShopModel().save({
            cartItemId: sId,
            applyTimes: sVal
        },{
            success: function (model,res) {
                that.renderTotal();
            }
        });
    },
    toggleSelectAll: function (e) {
        var $this = $(e.target),
            isCheck = $this.is(":checked");
        if(isCheck){
            $('.is-select-shop').each(function () {
                if (this.checked == false) {
                    this.checked = true;
                }
            });
            $('.select-all').each(function () {
                if (this.checked == false) {
                    this.checked = true;
                }
            });
            $('.toShopPay').removeClass('disabled');
        }
        else {
            $('.is-select-shop').each(function () {
                if (this.checked == true) {
                    this.checked = false;
                }
            });
            $('.select-all').each(function () {
                if (this.checked == true) {
                    this.checked = false;
                }
            });
            $('.toShopPay').addClass('disabled');
        }
        this.renderTotal();
        e.stopPropagation();
    },
    toggleSelectCar: function (e) {
        this.renderTotal();
        e.stopPropagation();
    },
    renderTotal: function () {
        var totalCount = 0,iCount = 0;
        var that = this;
        that.shopArray = [];
        that.shopObj = {};

        $('.amount-dis').each(function () {
            var $this = $(this),
                $li = $this.closest('li'),
                sId = $li.attr('attrid'),
                isChecked = $li.find('input[type="checkbox"]').is(":checked"),
                iPrice = parseFloat($li.find('.price').html().replace('元')),
                iNumber = parseInt($.trim($li.find('.apply-times').val())),
                iTotal = (10000*iPrice*iNumber)/10000;
            that.shopObj[sId] = {
                num: iNumber,
                price: iPrice
            };
            if($this.html() != iTotal){
                $this.html(iTotal);
            }
            if(isChecked) {
                that.shopArray.push(sId);
                totalCount = (iTotal*10000 + totalCount*10000)/10000;
                iCount++;
            }
        });
        if(iCount == 0){
            $('.toShopPay').addClass('disabled');
        }
        else {
            $('.toShopPay').removeClass('disabled');
        }
        $('.total-number').html(iCount);
        $('.total-price').html('￥'+totalCount);
    },
    renderPage: function () {
        if(this.pagObj.pageNum < this.pagObj.totalPage) {
            $('.pagination').find('.next-page').removeClass('disabled');
        }
        else {
            $('.pagination').find('.next-page').addClass('disabled');
        }
        if(this.pagObj.pageNum == 1){
            $('.pagination').find('.prev-page').addClass('disabled');
        }
        else {
            $('.pagination').find('.prev-page').removeClass('disabled');
        }
    },
    render: function () {
        this.$el.find('#orderInfo').html(shopTemplate);
    },
    deleteCar: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确定要删除该条购物车记录？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = parseInt($(e.target).closest('li').attr('attrid'));
            new deleteShopModel().fetch(
                {
                    data: {cartItemId: sId},
                    type: 'GET',
                    success: function () {
                        layer.msg('删除成功');
                        if(that.model.get('result') && that.model.get('result').list && that.model.get('result').list.length == 1 && that.pagObj.pageNum != 1){
                            that.pagObj.pageNum--;
                        }
                        that.model.fetch({
                            data: {
                                pageSize: that.pagObj.pageSize,
                                page: that.pagObj.pageNum
                            }
                        });
                    }
                });
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
        e.stopPropagation();
    },
    toPay: function (e) {
        var $this = $(e.target).is('button') ? $(e.target) : $(e.target).parent();
        if(!$this.hasClass('disabled')){
            new getOrderIdModel().fetch({
                data: {
                    cartIds: this.shopArray.join(',')
                },
                success: function (model,res) {
                    if(parseFloat($('.total-price').html().replace('￥','')) == 0){
                        layer.msg('购买成功!');
                        setTimeout(function () {
                            location.href = 'userInfo.html#order';
                        },1000);
                    }
                    else {
                        var param = {
                            orderNum: res.result
                        };
                        var base = new Base64;
                        window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
                        location.href = 'pay.html';
                    }
                }
            });
        }
    }
});

module.exports = shopCarView;