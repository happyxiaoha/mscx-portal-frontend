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


//验证密码只能包含数字字母下划线中划线
jQuery.validator.addMethod("password", function(value, element) {
    var password = /[a-zA-Z0-9_-]$/;
    return this.optional(element) || (password.test(value));
}, "密码只能包含数字字母下划线中划线");