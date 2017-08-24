<template>
  <div class="layout">
    <c-header active="index" @loaded="handleHeaderLoaded"></c-header>
    <div class="content grid-l">
      <el-row class="main-area">
        <el-col :span="5" class="navigator">
          <c-navigator></c-navigator>
        </el-col>
        <el-col :span="14" class="center">
          <el-carousel :interval="banner.autoplaySpeed" height="366px" class="banner">
              <el-carousel-item v-for="item in banner.list">
                <a :href="item.bannerUrl">
                  <img :src="item.bigBannerPic">
                </a>
              </el-carousel-item>
              <!-- <el-carousel-item>
                  <img src="../../assets/images/banner2.png">
              </el-carousel-item>
              <el-carousel-item>
                  <img src="../../assets/images/banner3.png">
              </el-carousel-item>
              <el-carousel-item>
                  <img src="../../assets/images/banner4.png">
              </el-carousel-item> -->
          </el-carousel>
          <c-recommand></c-recommand>
        </el-col>
        <el-col :span="5" class="user">
          <div class="user-top">
            <div class="user-top-inner">
              <img v-if="user.headPortrait && user.headPortrait !== 'null'" :src="user.headPortrait">
              <img v-else src="../../assets/images/avatar.png">
              <div class="user-tip">
                <p>欢迎来到神州数云</p>
                <template v-if="user.userId">
                  <a href="userInfo.html">{{user.account}}</a>
                </template>
                <template v-else>
                  <a href="login.html">登录</a>
                  <a href="register.html">注册</a>
                </template>
              </div>
            </div>
          </div>
          <div class="user-middle">
            <ul>
              <li class="api">
                <a href="javascript:;" @click="goPublishApi">
                  <span>发布API</span>
                </a>
              </li>
              <li class="app">
                <a href="javascript:;" @click="goPublishService">
                  <span>发布微应用</span>
                </a>
              </li>
              <li class="demand">
                <a href="javascript:;" @click="goPublishDemand">
                  <span>发布需求</span>
                </a>
              </li>
              <li class="saas">
                <a href="javascript:;" @click="goPublishSaas">
                  <span>发布SaaS</span>
                </a>
              </li>
              <li class="paas">
                <a href="javascript:;" @click="goPaas">
                  <span>进入PaaS</span>
                </a>
              </li>
              <li class="data">
                <a href="javscript:;" @click="goEthink">
                  <span>数据可视化</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="user-bottom">
            <span class="notice-title">公告</span>
            <div class="scroll-wrap">
              <ul class="notice-list" id="noticeList" :style="{top}">
                <li v-for="item in noticeList">{{item.newestInfo}}</li>
              </ul>
            </div>
          </div>
          <!-- <div class="user-middle">
            <c-upload id="fileId">
              <el-upload slot="elUpload" id="serviceIcon" action="/ro/mscx-app-api/pic/upload.do" :before-upload="handleBeforeUpload">
                  <el-button type="ghost" icon="ios-cloud-upload-outline">上传文件</el-button>
              </el-upload>
            </c-upload>
          </div> -->
        </el-col>
      </el-row>
      <c-selected-api></c-selected-api>
      <c-selected-app></c-selected-app>
      <c-selected-saas></c-selected-saas>
      <div class="develop-area">
        <div class="top">
          <img src="./images/develop-title.png">
        </div>
        <div class="develop-item">
          <img src="./images/develop-api.png">
          <p class="develop-title">API测试工具</p>
          <div class="develop-content">
            <p>神州数云为您提供在线API测试工具，在您申请 完API后，方可使用该工具。选择申请的接口，查看 参数信息，输入参数</p>
            <button @click="goApiTest">点击查看</button>
          </div>
        </div>
        <div class="develop-item">
          <img src="./images/develop-data.png">
          <p class="develop-title">数据可视化</p>
          <div class="develop-content">
            <p>数据可视化工具利用数据仓库、数据挖掘技术 对数据迚行系统的储存和管理，幵通过各种数据统 计分析工具迚行分析，提供各</p>
            <button @click="goEthink">点击查看</button>
          </div>
        </div>
        <div class="develop-item">
          <img src="./images/develop-paas.png">
          <p class="develop-title">神州数云PaaS</p>
          <div class="develop-content">
            <p>神州数云PASS平台为您提供丰富的开发资源和 模板，包括测试资源申请、生产资源申请、环境配 置、测试功能、上线功能</p>
            <button @click="goPaas">点击查看</button>
          </div>
        </div>
      </div>
    </div>
    <c-footer></c-footer>
    <c-side-nav></c-side-nav>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  import upload from 'components/upload/upload'
  import sideNav from 'components/sideNav'
  import navigator from './components/navigator'
  import recommand from './components/recommand'
  import selectedApi from './components/selectedApi'
  import selectedApp from './components/selectedApp'
  import selectedSaas from './components/selectedSaas'
  import API from 'common/api'
  import Axios from 'axios'
  const cityStation = require('common/json/cityStation.json')
  export default {
    data: function() {
      return {
        banner: {
          autoplaySpeed: 3000,
          list: []
        },
        barStyle: {},
        noticeList: [],
        activeScrollIndex: 0
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      city () {
        return this.$store.getters.city
      },
      top () {
        return - this.activeScrollIndex * 20 + 'px'
      }
    },
    mounted () {
      setInterval(() => {
        if(this.activeScrollIndex < this.noticeList.length - 1) {
          this.activeScrollIndex += 1
        }else {
          this.activeScrollIndex = 0
        }
      }, 1000)
    },
    created () {
      // 获取公共
      Axios.get('static_html/datainfo/c2_newestInfo/index.html').then((res) => {
        this.noticeList = res
      })
    },
    components: {
      'c-header': header,
      'c-footer': footer,
      'c-upload': upload,
      'c-navigator': navigator,
      'c-recommand': recommand,
      'c-selected-api': selectedApi,
      'c-selected-app': selectedApp,
      'c-selected-saas': selectedSaas,
      'c-side-nav': sideNav
    },
    methods: {
      goApiTest () {
        location.href = 'http://mscx_apitest_utils.citysdk.cn/'
      },
      goPaas () {
        if(this.user.userType && this.user.userType !== 'REGISTER') {
          API.Common.jumpDevelop().then((res)=> {
            location.href = res.result
          })
        }else {
          location.href = 'userInfo.html#user/auth'
        }
      },
      goEthink () {
        API.Common.redirectToEthink().then((res) => {
          location.href = res.result
        })
      },
      goPublishApi () {
        if(!this.user.userId) {
          location.href = 'login.html' + '?service='+ encodeURIComponent('/api/create')
        }else {
          location.href = '/api/create'
        }
      },
      goPublishService () {
        if(!this.user.userId) {
          location.href = 'login.html' + '?service='+ encodeURIComponent('/services/create')
        }else {
          location.href = '/services/create'
        }
      },
      goPublishDemand () {
        if(!this.user.userId) {
          location.href = 'login.html' + '?service='+ encodeURIComponent('/demand/api/create')
        }else {
          location.href = '/demand/api/create'
        }
      },
      goPublishSaas () {
        if(!this.user.userId) {
          location.href = 'login.html' + '?service='+ encodeURIComponent('/saas/create')
        }else {
          location.href = '/saas/create'
        }
      },
      handleHeaderLoaded () {
        Axios.get('/static_html/datainfo/' + this.city.abbr + '_bannerpic/index.html?t='+new Date().getTime()).then((res) => {
          this.banner.list = res
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  @import "../../assets/less/mixins.less";
  .layout {
    background: #f7f8fc;
    .content {
      margin-top: 30px;
    }
    .main-area {
      height: 495px;
      .box-shadow();
      .navigator {
        background: #333;
        height: inherit;
      }
      .center {
        background: #fff;
        height: inherit;
        .banner {
          height: 366px;
          img {
            height: 366px;
            width: 100%;
          }
        }
      }
      .user {
        background: #f6f8fc;
        height: inherit;
        padding: 0 20px;
        .user-top {
          border-bottom: 1px solid #ccc;
          width: 100%;
          .user-top-inner {
            height: 90px;
            display: table-cell;
            vertical-align: middle;
            img {
              width: 55px;
              height: 55px;
              vertical-align: middle;
            }
            .user-tip {
              display: inline-block;
              vertical-align: middle;
              margin-left: 10px;
              font-size: 14px;
              p {
                color: #666;
                margin-bottom: 3px;
              }
              a {
                color: @linkColor;
              }
            }
          }
        }
        .user-middle {
          height: 275px;
          border-bottom: 1px solid #ccc;
          li {
            width: 50%;
            float: left;
            text-align: center;
            height: 92.6px;
            a {
              height: 100%;
              display: block;
              color: #000;
            }
            &.api {
              background: url(./images/api-icon.png) center 20px no-repeat;
            }
            &.app {
              background: url(./images/app-icon.png) center 20px no-repeat;
            }
            &.demand {
              background: url(./images/demand-icon.png) center 20px no-repeat;
            }
            &.data {
              background: url(./images/data-icon.png) center 20px no-repeat;
            }
            &.paas {
              background: url(./images/paas-icon.png) center 20px no-repeat;
            }
            &.saas {
              background: url(./images/saas-icon.png) center 20px no-repeat;
            }
            span {
              top: 65px;
              position: relative;
            }
          }
        }
        .user-bottom {
          padding-top: 25px;
          .notice-title {
            background: url(./images/notice-icon.png) left center no-repeat;
            padding-left: 25px;
          }
          .scroll-wrap {
            margin-top: 10px;
            height: 60px;
            overflow: hidden;
          }
          .notice-list {
            position: relative;
            transition: top 0.5s;
            li {
              line-height: 20px;
            }
          }
        }
      }
    }
    .develop-area {
      margin-top: 30px;
      overflow: hidden;
      padding-bottom: 10px;
      .develop-item {
        width: 30%;
        margin-top: 20px;
        float: left;
        box-sizing: border-box;
        height: 350px;
        border: 1px solid #ccc;
        background: #fff;
        position: relative;
        .box-shadow();
        &:nth-child(2n+1) {
          margin-left: 5%;
          margin-right: 5%;
        }
        img {
          height: 160px;
          width: 100%;
        }
        .develop-title {
          font-size: 18px;
          position: absolute;
          top: 125px;
          left: 20px;
          color: #fff;
        }
        .develop-content {
          padding: 30px 30px 10px 30px;
          position: relative;
          p {
            text-indent: 2em;
          }
          button {
            position: absolute;
            top: 140px;
            background: #fff;
            border: 1px solid #ccc;
            padding: 5px 10px;
            border-radius: 15px;
            color: #aaa;
            outline: none;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
