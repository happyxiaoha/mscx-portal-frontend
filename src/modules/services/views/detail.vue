<template>
  <div class="content" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response">
    <div class="detail-header grid-l">
      <div class="detial-header-left">
        <div class="header-title">
          <h1>{{detail.name}}</h1>
          <span class="tag" v-for="item in detail.tagNames.split(',')">{{item}}</span>
        </div>
        <div class="header-info">
          <span>更新时间：{{detail.updatedTime && new Date(detail.updatedTime).toISOString().slice(0,10)}}</span>
          <span>服务状态：{{detail.statusDesc}}</span>
        </div>
        <div class="header-info">
          <span>服务商：{{detail.providerName}}</span>
          <span>服务方式：{{detail.serviceType}}</span>
          <span>综合评分：{{detail.avgScore || '-'}}分</span>
          <el-rate v-if="isRealAuth" v-model="score" :disabled="scoreDisabled" @change="handleScore" class="rate"></el-rate>
          <span class="score-error">{{scoreErrorText}}</span>
          <div class="header-oper">
            <el-tooltip class="item" effect="dark" content="访问量" placement="top-end">
              <span class="api-view">{{detail.viewCount}}</span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="detail.attentionFlag ? '点击取消关注' : '点击关注'" placement="top-end">
              <span :class="[detail.attentionFlag ? 'active' : '' ,'api-fav']" @click="follow">{{detail.attentionCount}}</span>
            </el-tooltip>
          </div>
        </div>
        <div class="header-charge">
          <!-- {{detail.chargeType === '01' ? detail.chargeTypeDesc : '¥' + detail.chargeTypeDesc}} -->
          {{detail.chargeTypeDesc}}
        </div>
      </div>
      <div class="detial-header-right" v-if="detail.status === '0'">
        <template v-if="detail.chargeType === '04'">
          <button class="btn-offline" @click="offlineChat">线下洽谈申请</button>
          <button class="btn-demo" @click="showDemo">查看演示</button>
        </template>
        <template v-else>
          <button class="btn-apply" @click="applyApp">申请</button>
          <button class="btn-demo" @click="showDemo">查看演示</button>
          <button class="btn-offline" @click="offlineChat">线下洽谈申请</button>
        </template>
      </div>
    </div>
    <hr>
    <div class="detail-main grid-l">
      <div class="detail-main-content">
        <p>接入URL：{{detail.uri}}</p>
        <p>服务简介：{{detail.description}}</p>
        <div v-if="detail.demoImage1 || detail.demoImage2 || detail.demoImage3">
          <el-carousel :interval="banner.autoplaySpeed" height="400px" class="banner">
            <el-carousel-item v-if="detail.demoImage1">
              <img :src="detail.demoImage1">
            </el-carousel-item>
            <el-carousel-item v-if="detail.demoImage2">
              <img :src="detail.demoImage2">
            </el-carousel-item>
            <el-carousel-item v-if="detail.demoImage3">
              <img :src="detail.demoImage3">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <hr>
    <c-share></c-share>
    <offline-dialog v-if="user.userId && loadOffline" :visible="offlineDialogVisible" :apiServiceId="appId" :type="6" :cname="detail.name" @toggle="toggleOfflineVisible"></offline-dialog>
    <apply-dialog v-if="user.userId && loadApply" :visible="applyDialogVisible" :id="appId" :chargeType="detail.chargeType" :resourceType="detail.resourceType" @toggle="toggleApplyVisible"></apply-dialog>
    <el-dialog v-if="loadDemo" :title="detail.name + '演示'" custom-class="demo-dialog" :visible.sync="demoVisible">
      <!-- <div v-loading="demoLoading"> -->
        <iframe :src="demoUrl" frameborder="0" onload="this.demoLoading = false;"></iframe>
      <!-- </div> -->
    </el-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  import loadingResponse from 'common/directive/response'
  export default {
    data: function() {
      return {
        appId: '',
        detail: {
          tagNames: '',
          attentionFlag: false
        },
        loading: {
          status: false,
          tip: ''
        },
        response: {},
        banner: {
          autoplaySpeed: 3000
        },
        demoLoading: true,
        offlineDialogVisible: false,
        applyDialogVisible: false,
        demoVisible: false,
        loadOffline: false,
        loadApply: false,
        loadDemo: false,
        score: 0,
        scoreDisabled: false,
        scoreErrorText: '',
        discountInfo: {}
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      demoUrl () {
        let url = this.detail.demoUri
        if(url && url.indexOf('http') < 0){
            url = 'http://' + url
        }
        return url
      },
      isRealAuth () {
        return this.user.userType && this.user.userType !== 'REGISTER'
      }
    },
    mounted () {
      
    },
    watch: {
      
    },
    created () {
      this.appId = +this.$route.params.id
      this.getDetail()
      if(window.location.search.indexOf('display') > -1) {
        this.showDemo()
      }
    },
    methods: {
      handleScore () {
        API.App.addScore({
          appId: this.appId,
          score: this.score
        }).then((res) => {
          this.scoreDisabled = true
        }).catch((res) => {
          this.scoreDisabled = true
          this.scoreErrorText = res.message
          setTimeout(() => {
            this.scoreErrorText = ''
          }, 1000)
        })
      },
      getDiscountInfo () {
        API.Provider.getDiscountInfo({
          resourceId: this.appId,
          resourceType: '03'
        }).then((res) => {
          this.discountInfo = res.result
        })
      },
      getDetail () {
        this.loading.status = true
        API.App.getAppDetail({
          id: this.appId
        }).then((res) => {
          this.detail = res.result
          this.loading.status = false
        }).catch((res) => {
          this.response = res
          this.loading.tip = res.message
        })
      },
      applyApp () {
        if(this.user.userId) {
          if(this.detail.publishType === '02') {
            this.loadOffline = true
            this.offlineDialogVisible = true
          }else {
            this.loadApply = true
            this.applyDialogVisible = true
          }
        }else {
          location.href = '/login.html?service=' + encodeURIComponent(location.href);
        }
      },
      offlineChat () {
        if(this.user.userId) {
          this.loadOffline = true
          this.offlineDialogVisible = true
        }else {
          location.href = '/login.html?service=' + encodeURIComponent(location.href);
        }
      },
      toggleOfflineVisible (arg) {
        this.offlineDialogVisible = arg
      },
      toggleApplyVisible (arg) {
        this.applyDialogVisible = arg
      },
      follow () {
        if (this.detail.attentionFlag) {
          // 取消关注
          API.App.unfollowApp({
            id: this.detail.id
          }).then((res) => {
            if(res.status === 'OK') {
              this.detail.attentionFlag = false
              this.detail.attentionCount = this.detail.attentionCount -1
            }else {

            }
          })
        }else {
          // 关注
          API.App.followApp({
            id: this.detail.id
          }).then((res) => {
            if(res.status === 'OK') {
              this.detail.attentionFlag = true
              this.detail.attentionCount = this.detail.attentionCount +1
            }else {
              
            }
          })
        }
      },
      showDemo () {
        // this.loadDemo = true
        // this.demoVisible = true
        let index = layer.open({
            type: 2,
            title: this.detail.name,
            shadeClose: false,
            shade: 0.8,
            maxmin: true,
            area: ['750px', '500px'],
            content: this.demoUrl
        });
      }
    },
    components: {
      'offline-dialog': () => import('components/offline'),
      'apply-dialog': () => import('../components/applyApp'),
      'c-share': () => import('components/share')
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  @import '../../../assets/css/markdown.css';
  .content {
    background: #fff;
    .detail-header {
      padding: 30px 0 20px 0;
      height: 175px;
      box-sizing: border-box;
      .detial-header-left {
        width: 75%;
        float: left;
        height: 125px;
        position: relative;
        .header-title {
          padding: 10px 0;
          h1 {
            display: inline-block;
            margin-right: 25px;
          }
          .tag {
            border: 1px solid #ddd;
            padding: 5px 10px;
            border-radius: 10px;
            margin-left: 20px;
          }
        }
        .header-info {
          padding: 10px 0;
          color: #aaa;
          & > span {
            margin-right: 20px;            
          }
          .rate {
            display: inline-block;
            vertical-align: top;
          }
          .score-error {
            color: #ff4949;
          }
          .header-oper {
            float: right;
            span {
              padding: 2px 25px;
              margin-left: 10px;
              border-right: 1px solid #ccc;
              &:last-child {
                border-right: 0;
              }
            }
            .api-view {
              background: url(../../../assets/images/view-icon.png) left center no-repeat;
            }
            .api-fav {
              cursor: pointer;
              background: url(../../../assets/images/star-icon.png) left center no-repeat;
              &.active {  
                background: url(../../../assets/images/star-hover.png) left center no-repeat;
              }
            }
          }
        }
        .header-charge {
          position: absolute;
          right: 45px;
          top: 30px;
          color: #ff8000;
          font-size: 18px;
        }
      }
      .detial-header-right {
        width: 25%;
        height: 125px;
        float: left;
        padding-left: 40px;
        border-left: 1px solid #ddd;
        box-sizing: border-box;
        button {
          display: block;
          background: @btnBackground;
          border: 1px solid @btnBackground;
          padding: 7px 20px;
          color: #fff;
          cursor: pointer;
          outline: none;
        }
        .btn-apply, .btn-demo {
          margin-bottom: 45px;
          display: inline-block;
        }
        .btn-demo {
          margin-left: 20px;
          background: #000;
          border: 1px solid #fff;
        }
        .btn-offline {
          background: #fff;
          color: @btnBackground;
        }
      }
    }
    hr {
      margin: 0;
    }
    .detail-main {
      margin-top: 30px;
      padding-bottom: 30px;
      .detail-main-content {
        overflow: hidden;
        width: 70%;
        margin: 0 auto;
        .banner {
          margin-top: 40px;
          text-align: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
    .demo-dialog {
      width: 800px;
      height: 500px;
      .el-dialog__body {
        padding: 0
      }
      iframe {
        width: 800px;
        height: 450px;
      }
    }
  }
</style>