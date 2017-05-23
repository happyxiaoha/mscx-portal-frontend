/**
 * Created by Administrator on 2016/12/26.
 */

//validate扩展验证

//验证只能包含字母数字下划线
jQuery.validator.addMethod("account", function(value, element) {
    var account = /[a-zA-Z0-9_]$/;
    return this.optional(element) || (account.test(value));
}, "只能包含数字字母下划线");

//验证以字母开头
jQuery.validator.addMethod("letterStart", function(value, element) {
    var account = /^[a-zA-Z]/;
    return this.optional(element) || (account.test(value));
}, "以字母开头");

//验证中文及逗号
jQuery.validator.addMethod("chineseAndSplit", function(value, element) {
    var account = /^[\u4E00-\u9FA5，]+$/;
    return this.optional(element) || (account.test(value));
}, "只能包含中文及逗号");

//验证手机号码及座机号
jQuery.validator.addMethod("contactWay", function(value, element) {
    var account = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[358]\d{9})$)/;
    return this.optional(element) || (account.test(value));
}, "请输入手机号码或座机号");

//验证座机号
jQuery.validator.addMethod("landlinePhone", function(value, element) {
    var account = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)/;
    return this.optional(element) || (account.test(value));
}, "请输入正确的座机号");
