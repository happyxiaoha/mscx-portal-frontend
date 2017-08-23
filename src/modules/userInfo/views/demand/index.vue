<template>
  <div>
    <div class="center-tabs">
      <div class="tab-active-bar" :style="barStyle"></div>
      <div :class="[activeTabIndex === 0 ? 'active' : '', 'center-item-tab']">
        <router-link :to="{ name: 'demandApi'}">发布的API需求</router-link>
      </div>
      <div :class="[activeTabIndex === 1 ? 'active' : '', 'center-item-tab']">
      <router-link :to="{ name: 'demandService'}">发布的服务需求</router-link>
      </div>
      <div :class="[activeTabIndex === 2 ? 'active' : '', 'center-item-tab']">
      <router-link :to="{ name: 'demandFollow'}">我的关注</router-link>
      </div>
      <div :class="[activeTabIndex === 3 ? 'active' : '', 'center-item-tab']">
      <router-link :to="{ name: 'demandAccept'}">我的接单</router-link>
      </div>
    </div>
    <div class="center-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeTabIndex: 0
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        if(vm.user.userType === 'REGISTER') {
          vm.$router.push({name: 'centerAuth'})
        }
      })
    },
    computed: {
      barStyle: {
        cache: false,
        get() {
          let style = {};
          let offset = 0;
          let tabWidth = 120;

          offset = tabWidth * this.activeTabIndex +  (this.activeTabIndex + 1) * 20 + 40;

          const transform = 'translateX(' + offset + 'px)';
          style.width = tabWidth + 'px';
          style.transform = transform;
          style.msTransform = transform;
          style.webkitTransform = transform;

          return style;
        }
      },
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      $route (to, from) {
        this.activeTabIndex = to.meta.subIndex;
      }
    },
    created () {
      this.activeTabIndex = this.$route.meta.subIndex
    }
  }
</script>
<style lang="less">
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .center-tabs {
    height: 60px;
    line-height: 60px;
    background: #fff;
    padding-left: 40px;
    position: relative;
    margin-bottom: 25px;
    .box-shadow();
    .tab-active-bar {
      width: 120px;
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
    .center-item-tab {
      float: left;
      width: 120px;
      text-align: center;
      padding-left: 20px;
      &.active a {
        color: @mainBackground;
      }
      a {
        color: #333;
        font-size: 16px;
      }
    }
  }
</style>