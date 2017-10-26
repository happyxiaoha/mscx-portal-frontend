<template>
  <div class="header">
    <div class="grid-l">
      <div class="logo">
        <a href="/index.html">
          <img :src="logoSrc"/>
        </a>
        <span v-if="isLogin">欢迎登录</span>
        <span v-if="isRegister">欢迎注册</span>
      </div>
      <div class="title">
        <span v-if="isLogin" class="login-tip"><a href="/index.html">神州数码智慧校园首页</a></span>
        <span v-if="isRegister" class="register-tip">已有账号？<a href="/login.html">请登录</a></span>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  const cityStation = require('common/json/cityStation.json')
  export default {
    props: {
      type: String
    },
    data: function() {
      return {
        headerType: this.type
      }
    },
    computed: {
      isLogin () {
        return this.headerType === 'login'
      },
      isRegister () {
        return this.headerType === 'register'
      },
      city () {
        return this.$store.getters.city
      },
      logoSrc () {
        return require('./images/header-logo.png')
      }
    },
    created () {
      let city = _.find(cityStation.cities, function(item){
        return item.url.indexOf(location.host) > -1;
      }) || cityStation.cities[0];
      this.$store.commit('setCity', city)
    }
  }
</script>
<style lang="less" scoped>
  .header {
    height: 80px;
    border-bottom: 1px solid #ccc;
    line-height: 80px;
    .grid-l {
      overflow: hidden;
    }
    .logo {
      float: left;
      img {
        vertical-align: middle;
      }
      span {
        font-size: 18px;
        margin-left: 20px;
        position: relative;
        top: 7px;
        color: #999;
      }
    }
    .title {
      float: right;
      span {
        
        text-align: center;
        padding: 10px 25px;
        color: #666;
        border-radius: 15px;
      }
      .login-tip {
        a {
          color: #666;
        }
        background: #f2f2f2;
      }
      .register-tip {
        font-size: 16px;
        color: #999;
        a {
          color: #333;
        }
      }
    }
  }
</style>