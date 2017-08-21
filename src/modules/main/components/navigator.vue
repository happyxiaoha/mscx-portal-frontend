<template>
  <div v-loading="loading" class="navigator-wrapper">
    <div class="navigator-header">
      <div :class="[tabBarClass, { 'app-active': isAppActive }]"></div>
      <div class="tab" @click="toggleTab('api')">API</div>
      <div class="tab" @click="toggleTab('app')">微应用</div>
    </div>
    <div class="navigator-content">
      <div :class="[tabPaneClass, { 'active': isApiActive }]">
        <ul>
          <li @mouseover="showApiSubMenu(index)" @mouseout="hideApiSubMenu" v-for="(item, index) in apiList" v-if="index < 7">
            <p>{{item.categoryName}}</p>
            <div :class="[ activeApiIndex === index ? 'active' : '', subMenuClass ]" v-if="item.apiServiceList.length > 0">
              <ul>
                <li v-for="service in item.apiServiceList">
                  <a :href="'api.html#detail/' + service.apiServiceId">{{service.apiServiceName}}</a>
                </li>
              </ul>
            </div>
          </li>
          <li @mouseover="showApiSubMenu(-1)">
            <p>
              <a href="api.html">更多</a>
            </p>
          </li>
        </ul>
      </div>
      <div :class="[tabPaneClass, { 'active': isAppActive }]">
        <ul>
          <li @mouseover="showAppSubMenu(index)" @mouseout="hideAppSubMenu" v-for="(item, index) in appList" v-if="index < 7 && item.appList.length > 0">
            <p>{{item.name}}</p>
            <div :class="[ activeAppIndex === index ? 'active' : '', subMenuClass ]">
              <ul>
                <li v-for="service in item.appList">
                  <a :href="'services.html#detail/' + service.id">{{service.name}}</a>
                </li>
              </ul>
            </div>
          </li>
          <li @mouseover="showApiSubMenu(-1)">
            <p>
              <a href="services.html">更多</a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'common/api/index'
  export default {
    data () {
      return {
        isAppActive: false,
        isApiActive: true,
        tabBarClass: 'tab-active-bar',
        tabPaneClass: 'tab-pane',
        apiList: [],
        appList: [],
        activeApiIndex: '',
        activeAppIndex: '',
        subMenuClass: 'sub-menu',
        apiLoading: true,
        appLoading: true
      }
    },
    computed: {
      loading () {
        return this.apiLoading && this.appLoading
      }
    },
    created () {
      API.Api.getNavigationApi().then((res) => {
        this.apiList = res.result
        this.apiLoading = false
      }).catch((res) => {
        // 获取导航API失败处理
      })

      API.App.getNavigationApp().then((res) => {
        this.appList = res.result
        this.appLoading = false
      })
    },
    methods: {
      toggleTab (tabName) {
        this.isAppActive = tabName === 'app'
        this.isApiActive = tabName === 'api'
      },
      showApiSubMenu (index) {
        this.activeApiIndex = index
      },
      hideApiSubMenu () {
        this.activeApiIndex = -1
      },
      showAppSubMenu (index) {
        this.activeAppIndex = index
      },
      hideAppSubMenu () {
        this.activeAppIndex = -1
      }
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  .navigator-wrapper {
    height: 495px;
  }
  .navigator-header {
    height: 40px;
    line-height: 40px;
    padding: 0 10%;
    position: relative;
    background: #000;
    .tab-active-bar {
      width: 30%;
      transform: translateX(50%);
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background-color: @mainBackground;
      z-index: 1;
      transition: transform .3s cubic-bezier(.645,.045,.355,1);
      list-style: none;
      &.app-active {
        transform: translateX(180%);
      }
    }
    .tab {
      cursor: pointer;
      display: inline-block;
      width: 28%;
      text-align: center;
      color: #fff;
      padding: 0 10%;
    }
  }
  .navigator-content {
    color: #fff;
    .tab-pane {
      display: none;
      &.active {
        display: block;
      }
      li {
        padding: 0 30px;
        cursor: default;
        .sub-menu {
          width: 20.83333%;
          background: rgba(51, 51, 51, .8);
          position: absolute;
          left: 20.83333%;
          height: 455px;
          top: 40px;
          z-index: 20;
          display: none;
          &.active {
            display: block;
          }
        }
        p, a {
          color: #fff;
          height: 55px;
          border-bottom: 1px solid #434343;
          line-height: 55px;
          padding-left: 5px;
          display: block;
        }
        &:hover {
          background: @mainBackground;
          & > p, & > a {
            border-bottom-color: @mainBackground;
          }
        }
        &:last-child {
          p, a{
            border-bottom: 0;  
          }
        }
      }
    }

  }
</style>