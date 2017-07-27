import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  user: {},
  modules: [],
  indexSaas: [],
  portalHost: ''
}

var getters = {
  user: function (state) {
    return state.user
  },
  modules: function (state) {
    return state.modules
  },
  indexSaas: function (state) {
    return state.indexSaas
  },
  portalHost: function (state) {
    return state.portalHost
  }
}

var mutations = {
  setModules: function (state, modules) {
    state.modules = modules
  },
  setIndexSaas: function (state, indexSaas) {
    state.indexSaas = indexSaas
  },
  setUser: function (state, user) {
    state.user = user || {}
  },
  clearUser: function (state) {
    state.user = {}
  },
  setPortalHost: function (state, host) {
    state.portalHost = host
  }
}

var store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
export default store
