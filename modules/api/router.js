/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '':'dataAPI',
        'data':'dataAPI',
        'tool':'toolAPI',
        'model':'modelAPI'
    },
    dataAPI:function () {
        var APIView = require('api/APIView.js');
        mscxPage.views['dataAPIViewObj'] = new APIView({
            id: 'data'
        });
    },
    toolAPI:function () {
        var APIView = require('api/APIView.js');
        mscxPage.views['toolAPIViewObj'] = new APIView({
            id: 'tool'
        });
    },
    modelAPI:function () {
        var APIView = require('api/APIView.js');
        mscxPage.views['modelAPIObj'] = new APIView({
            id: 'model'
        });
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    execute: function(callback,args,name) {
        if(mscxPage.views[name+'Obj']) {
            mscxPage.views[name+'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});

module.exports = Routes;

