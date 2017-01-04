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
    var account = /^[\u4E00-\u9FA5,，]+$/;
    return this.optional(element) || (account.test(value));
}, "只能包含中文及逗号");