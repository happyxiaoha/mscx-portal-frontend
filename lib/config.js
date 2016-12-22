/**
 * Created by Kevin on 2016/12/6.
 */

var mscxPage = {
    domEl: {
        mainEl: '#content',
        headerEl: '#headSection',
        footerEl: '#footSection',
        apiEl: '.api-content',
        demandEl: '.demand-content',
        userEl: '.my-info-area',
        userCenterLeft: '.left-list-wrap',
        userCenterRight: '.right-con-wrap',
        pioneeringEl: '.pioneering-content'
    },
    views: {},
    appRouter: {},
    host: '',
    urlConfig: {
        indexPage: 'index.html',
        sourcesPage: 'sources.html',
        apiPage: 'api.html',
        servicesPage: 'services.html',
        demandPage: 'demand.html',
        pioneeringPage: 'pioneering.html'
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
        data: '/ro/mscx-data-api/'
    }
};