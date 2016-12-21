/**
 * Created by Kevin on 2016/12/6.
 */

var backboneSync = Backbone.sync;

Backbone.sync = function(method, model, options) {
    var beforeSend = options.beforeSend,
        success = options.success,
        complete = options.complete,
        error = options.error;
    
    options.beforeSend = function (xhr) {
        //this.type = 'POST';
        if (beforeSend) return beforeSend.apply(this, arguments);
    };
    options.complete = function (xhr) {
        if (complete) return complete.apply(this, arguments);
    };
    options.error = function(xhr) {
        layer.alert('系统错误', {icon: 2});
        if (error) return error.apply(this, arguments);
    };
    options.success = function (xhr) {
        if(xhr.status == 'ERROR' && xhr.code == 500800) { //un log
            var sHref = window.location.href,
                sUrl = 'login.html' + '?service='+sHref;
            location.href = sUrl;
        }
        else if(xhr.status == 'ERROR'){
            var pageType = $(document).find('body').data('type');

            if(pageType == 'index') return;
            if(layer){
                layer.alert(xhr.message,{icon: 2});
            }
            else {
                alert(xhr.message);
            }
            if (error) return error.apply(this, arguments);
        }
        else {
            if (success) return success.apply(this, arguments);
        }
    };
    return backboneSync(method, model, options);
};

$(function () {
    var $document = $(document);
    var pageType = $document.find('body').data('type');

    if(pageType == 'index') return;

    $document.ajaxStart(function(){
        layer.closeAll('loading');
        layer.load(2,{shade:0.2, area: ['32px', '64px']});
    });
    $document.ajaxStop(function(){
        layer.closeAll('loading');
    });
    $document = null;
});