<template>
  <div class="layout">
    <c-header active="api"></c-header>
    <div class="sub-header" v-if="activeTabIndex > -1">
      <div class="grid-l">
        <div class="tab-wrapper">
          <div class="tab-active-bar" :style="barStyle"></div>
          <div :class="[activeTabIndex === 0 ? 'active' : '', 'api-tab']">
            <router-link :to="{ name: 'dataList' }">数据API</router-link>
            <!-- <a href="/api/">数据API</a> -->
          </div>
          <div :class="[activeTabIndex === 1 ? 'active' : '', 'api-tab']">
            <router-link :to="{ name: 'toolList' }">工具API</router-link>
            <!-- <a href="/api/tool/">工具API</a> -->
          </div>
          <div :class="[activeTabIndex === 2 ? 'active' : '', 'api-tab']">
            <router-link :to="{ name: 'modelList' }">模型API</router-link>
            <!-- <a href="/api/model/">模型API</a> -->
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
  import API from 'common/api'
  export default {
    data: function() {
      return {
        activeTabIndex: -1
      }
    },
    computed: {
      barStyle: {
        cache: false,
        get() {
          let style = {};
          let offset = 0;
          let tabWidth = 100;

          offset = tabWidth * this.activeTabIndex;

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
        this.activeTabIndex = to.meta.index;
      }
    },
    created () {
      this.activeTabIndex = this.$route.meta.index
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
        width: 300px;
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
