import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  user: {},
  city: {
    abbr: 'quanguo'
  },
  // 新增修改API时使用
  chargeRuleList: [],
  apiItemList: [],
  // 新增修改微服务时使用
  serviceUrlList: [],
  hasAccount: false
}

var getters = {
  user: function (state) {
    return state.user
  },
  city: function (state) {
    return state.city
  },
  chargeRuleList: function (state) {
    return state.chargeRuleList
  },
  apiItemList: function (state) {
    return state.apiItemList
  },
  serviceUrlList: function (state) {
    return state.serviceUrlList
  },
  hasAccount: function (state) {
    return state.hasAccount
  }
}

var mutations = {
  setUser: function (state, user) {
    state.user = user || {}
  },
  clearUser: function (state) {
    state.user = {}
  },
  removeUserAvatar: function() {
    state.user.headPortrait = ''
  },
  setHasAccount: function (state, hasAccount) {
    state.hasAccount = hasAccount
  },
  setCity: function (state, city) {
    state.city = city || {}
  },
  clearCity: function (state) {
    state.city = {}
  },
  setServiceUrlList: function (state, serviceUrlList) {
    state.serviceUrlList = serviceUrlList || []
  },
  clearServiceUrlList: function (state) {
    state.serviceUrlList = []
  },
  addServiceUrl: function (state, serviceUrl) {
    state.serviceUrlList.push(serviceUrl)
  },
  removeServiceUrl: function (state, serviceUrlIndex) {
    state.serviceUrlList.splice(serviceUrlIndex, 1)
  },
  flagServiceUrlDetele: function (state, serviceUrlIndex) {
    state.serviceUrlList[serviceUrlIndex].flag = 'D'
  },
  updateServiceUrl: function (state, payload) {
    state.serviceUrlList[payload.serviceUrlIndex] = payload.serviceUrl
  },
  setChargeRuleList: function (state, chargeRuleList) {
    state.chargeRuleList = chargeRuleList
  },
  addChargeRule: function (state, chargeRule) {
    state.chargeRuleList.push(chargeRule)
  },
  removeChargeRule: function (state, chargeRuleIndex) {
    state.chargeRuleList.splice(chargeRuleIndex, 1)
  },
  flagChargeRuleDetele: function (state, chargeRuleIndex) {
    state.chargeRuleList[chargeRuleIndex].flag = 'D'
  },
  updateChargeRule: function (state, payload) {
    state.chargeRuleList[payload.chargeRuleIndex] = payload.chargeRule
  },
  clearChargeRuleList: function (state) {
    state.chargeRuleList = []
  },
  setApiItemList: function (state, apiItemList) {
    state.apiItemList = apiItemList
  },
  addApiItem: function (state, apiItem) {
    state.apiItemList.push(apiItem)
  },
  removeApiItem: function (state, apiItemIndex) {
    state.apiItemList.splice(apiItemIndex, 1)
  },
  updateApiItem: function (state, payload) {
    state.apiItemList[payload.apiIndex] = payload.apiItem
  },
  flagApiItemDetele: function (state, apiItemIndex) {
    state.apiItemList[apiItemIndex].flag = 'D'
  },
  clearApiItemList: function (state) {
    state.apiItemList = []
  }
}

var store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
export default store
