<template>
  <div>
    <div class="center-tabs">
      <div class="tab-active-bar" :style="barStyle"></div>
      <div v-if="hasAccount" :class="[activeTabIndex === 0 ? 'active' : '', 'center-item-tab']">
        <router-link :to="{ name: 'accountIndex'}">账户充值</router-link>
      </div>
      <div :class="[activeTabIndex === 1 ? 'active' : '', 'center-item-tab']">
      <router-link :to="{ name: 'accountPassword'}">支付密码设置</router-link>
      </div>
      <div v-if="hasAccount" :class="[activeTabIndex === 2 ? 'active' : '', 'center-item-tab']">
      <router-link :to="{ name: 'rechargeRecord'}">充值记录</router-link>
      </div>
      <div v-if="hasAccount" :class="[activeTabIndex === 3 ? 'active' : '', 'center-item-tab']">
      <router-link :to="{ name: 'consumeRecord'}">支出记录</router-link>
      </div>
      <div :class="[activeTabIndex === 4 ? 'active' : '', 'center-item-tab']">
      <router-link :to="{ name: 'accountInvoice'}">发票申请</router-link>
      </div>
    </div>
    <div class="center-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  export default {
    data () {
      return {
      }
    },
    computed: {
      barStyle: {
        cache: false,
        get() {
          let style = {};
          let offset = 0;
          let tabWidth = 100;

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
      },
      hasAccount () {
        return this.$store.getters.hasAccount
      },
      activeTabIndex () {
        let activeIndex
        if(!this.hasAccount) {
          if(this.$route.name === 'accountPassword') {
            activeIndex = 0
          }else if(this.$route.name === 'accountInvoice') {
            activeIndex = 1
          }
        }else {
          activeIndex = this.$route.meta.subIndex
        }
        return activeIndex
      }
    },
    watch: {
      // $route (to, from) {
      //   this.activeTabIndex = to.meta.subIndex;
      // }
    },
    created () {
      API.Account.getAccountInfo().then((res) => {
        // 如果账户不存在，那么跳转支付密码设置页面。同时，账户充值/充值记录/支出记录tab标签隐藏
        if(res.result == 'noAccount') {
          if(this.$route.name !== 'accountInvoice') {
            this.$router.push({name: 'accountPassword'})
          }
        }else {
          this.$store.commit('setHasAccount', true)
        }
      })
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
    .center-item-tab {
      float: left;
      width: 100px;
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