/**
 * Created by Kevin on 2016/12/6.
 */

var mscxPage = {
    domEl: {
        mainEl: '#content',
        headerEl: '#headSection',
        subHeaderEl: '.ns-nav',
        footerEl: '#footSection',
        apiEl: '.api-content',
        demandEl: '.demand-content',
        userEl: '.my-info-area',
        userCenterLeft: '.left-list-wrap',
        userCenterRight: '.right-con-wrap',
        pioneeringEl: '.pioneering-content',
        startupEl: '.startup-content',
        payEl: '.pay-content'
    },
    views: {},
    appRouter: {},
    host: '',
    payReturnHost: location.protocol + '//' + location.host + '/',
    shareHost: location.protocol + '//' + location.host + '/',
    // payReturnHost: 'http://myoss.dceast.cn:86/',
    urlConfig: {
        indexPage: 'index.html',
        sourcesPage: 'sources.html',
        apiPage: 'api.html',
        servicesPage: 'services.html',
        demandPage: 'demand.html',
        pioneeringPage: 'pioneering.html',
        startupPage: 'startup.html',
        saasPage: 'saas.html'
    },
    userInfo: '',
    userAuthType: {
        'REGISTER': '未认证',
        'PERSON': '个人实名认证用户',
        'ENTERPRISE': '企业实名认证用户',
        'PARTNER_ORG': '合作伙伴',
        'PARTNER_GOV': '合作伙伴'
    },
    userStatus: {
        'REGISTER': '未认证',
        'PERSON': '已经认证',
        'ENTERPRISE': '已经认证',
        'PARTNER_ORG': '已经认证',
        'PARTNER_GOV': '已经认证'
    },
    sourceStatus: ['暂存','处理中','已通过','已拒绝','已接单','已关闭'],
    request: {
        api: '/ro/mscx-api-api/',
        dict: '/ro/mscx-dict-api/',
        demand: '/ro/mscx-requirement-api/',
        app: '/ro/mscx-app-api/',
        order: '/ro/mscx-order-api/',
        uc: '/ro/mscx-uc-api/',
        data: '/ro/mscx-datareport-api/',
        mes: '/ro/mscx-message-api/',
        saas: '/ro/mscx-saas-api/'
    },
    isLogin: function() {
        if(!mscxPage.userInfo){
            location.href = 'login.html?service=' + encodeURIComponent(location.href);
        }
        return !!mscxPage.userInfo;
    },
    isRealName: function() {
        var isRealName = true;
        if(mscxPage.userInfo && mscxPage.userInfo.userType == 'REGISTER'){
            isRealName = false;
            location.href = 'userInfo.html#userAuth';
        }
        return isRealName;
    },
    jumpDevelop: function() {
        $.ajax({
            url: '/developer/portal.do',
            success: function(data) {
                if(data.code == '500800') {
                    location.href = 'login.html?service=' + encodeURIComponent(location.href);
                } else if(data.code == '500900') {
                    location.href = 'userInfo.html#userAuth';
                } else {
                    location.href = data.result;
                }
            }
        })
    }
};