<template>
  <div class="layout">
    <c-header active="demand"></c-header>
    <div class="sub-header" v-if="activeTabIndex !== ''">
      <div class="grid-l" ref="tabs">
        <div class="tab-wrapper">
          <div class="tab-active-bar" :style="barStyle"></div>
          <div :class="[activeTabIndex === 0 ? 'active' : '', 'api-tab']">
            <a href="#/">API开发环境</a>
          </div>
          <div :class="[activeTabIndex === 1 ? 'active' : '', 'api-tab']">
            <a href="#/serverEnv">服务开发环境</a>
          </div>
          <div :class="[activeTabIndex === 2 ? 'active' : '', 'api-tab']">
            <a href="#/api">API开发需求</a>
          </div>
          <div :class="[activeTabIndex === 3 ? 'active' : '', 'api-tab']">
            <a href="#/service">服务任务</a>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  export default {
    data: function() {
      return {
        tabs: [],
        activeTabIndex: ''
      }
    },
    computed: {
      barStyle: {
        cache: false,
        get() {
          let style = {};
          let offset = 0;
          let tabWidth = 100;

          offset = tabWidth * this.activeTabIndex + (this.activeTabIndex + 1) * 20;

          const transform = 'translateX(' + offset + 'px)';
          style.width = tabWidth + 'px';
          style.transform = transform;
          style.msTransform = transform;
          style.webkitTransform = transform;

          return style;
        }
      }
    },
    mounted () {

    },
    watch: {
      $route (to, from) {
        this.activeTabIndex = typeof to.meta.index === 'undefined' ? '' : to.meta.index
      }
    },
    created () {
      this.activeTabIndex = typeof this.$route.meta.index === 'undefined' ? '' : this.$route.meta.index
    },
    components: {
      'c-header': header,
      'c-footer': footer
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .layout {
    background: #f7f8fc;
    .sub-header {
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #ccc;
      .grid-l {
        text-align: center;
        position: relative;
      }
      .tab-wrapper {
        position: relative;
        width: 520px;
        box-sizing: border-box;
        margin: 0 auto;
        overflow: hidden;
      }
      .tab-active-bar {
        width: 100px;
        transform: translateX(0);
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: @mainBackground;
        z-index: 1;
        transition: transform .3s cubic-bezier(.645,.045,.355,1);
        list-style: none;
        &.active {
          transform: translateX(180%);
        }
      }
      .api-tab {
        float: left;
        height: 50px;
        line-height: 50px;
        width: 100px;
        padding-left: 20px;
        text-align: center;
        &.active a {
          color: @mainBackground;
        }
        a {
          color: #333;
        }
      }
    }
  }
</style>
