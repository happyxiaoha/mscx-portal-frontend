<template>
  <div class="content" v-loading="loading">
    <div class="detail-header grid-m">
      <div class="detial-header-left">
        <div class="header-title">
          <h1>{{detail.apiServiceCName}}</h1>
          <span class="tag" v-for="item in detail.tagsName.split(',')">{{item}}</span>
        </div>
        <div class="header-info">
          <span>API状态：{{detail.statusDesc}}</span>
          <span>服务区域：{{detail.scope}}</span>
          <span>所属分类：{{detail.categoryName}}</span>
          <span>服务商：{{detail.providerName}}</span>
        </div>
        <div class="header-info">
          <span>更新时间：{{detail.updatedTime && new Date(detail.updatedTime).toISOString().slice(0,10)}}</span>
          <span>综合评分：{{detail.avgScore || '-'}}分</span>
          <el-rate v-if="isRealAuth" v-model="score" :disabled="scoreDisabled" @change="handleScore" class="rate"></el-rate>
          <span class="score-error">{{scoreErrorText}}</span>
          
          <div class="header-oper">
            <el-tooltip class="item" effect="dark" content="申请量" placement="top-end">
              <span class="api-apply">{{detail.applyCnt}}</span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="访问量" placement="top-end">
              <span class="api-view">{{detail.viewCnt}}</span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="detail.attentionFlag ? '点击取消关注' : '点击关注'" placement="top-end">
              <span :class="[detail.attentionFlag ? 'active' : '' ,'api-fav']" @click="follow">{{detail.attentionCnt}}</span>
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
          <button class="btn-offline" @click="applyApi">申请</button>
        </template>
        <template v-else>
          <button class="btn-apply" @click="applyApi">申请</button>
          <button class="btn-offline" @click="offlineChat">线下洽谈申请</button>
        </template>
      </div>
    </div>
    <hr>
    <div class="detail-main grid-m">
      <div class="detail-main-tabs">
        <a href="javascript:;" @click="switchTab(0)" :class="[activeTab === 0 ? 'active' : '']">API调用</a>
        <a href="javascript:;" @click="switchTab(1)" :class="[activeTab === 1 ? 'active' : '']">返回码</a>
        <a href="javascript:;" @click="switchTab(2)" :class="[activeTab === 2 ? 'active' : '']">套餐介绍</a>
      </div>
      <div class="detail-main-content">
        <div v-show="activeTab === 0">
          <div class="detail-main-left">
            <a href="javascript:;" @click="switchApiTab(index)" :class="apiActiveTab === index ? 'active' : ''" v-for="(item, index) in detail.apiList">{{item.apiCName}}</a>
          </div>
          <div class="detail-main-right" v-show="apiActiveTab === index" v-for="(item, index) in detail.apiList">
            <p>接口地址：{{item.encodeUri}}</p>
            <p>支持格式：{{item.requestType}}</p>
            <p>请求方式：{{item.requestMethod}}</p>
            <p>参数和示例：</p>
            <div class="markdown-body" v-html="item.testPacket"></div>
            <p>备注信息：</p>
            <div class="markdown-body" v-html="item.directions"></div>
          </div>
        </div>
        <div class="detail-main-pane" v-show="activeTab === 1">
          <div class="markdown-body" v-html="detail.rtnCode"></div>
        </div>
        <div class="detail-main-pane" v-show="activeTab === 2">
          <h4>常规套餐包<span class="sub-package-title">【更多次数、更多优惠请线下洽谈】</span></h4>
          <table class="table">
              <tbody>
              <tr>
                  <th>名称</th>
                  <th>价格</th>
                  <th>次数/月数</th>
                  <th>说明</th>
              </tr>
              <tr v-for="item in detail.chargeRuleList">
                  <td>{{item.name}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.chargeCount}}</td>
                  <td>{{item.description}}</td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr>
    <c-share></c-share>
    <offline-dialog v-if="user.userId && loadOffline" :visible="offlineDialogVisible" :apiServiceId="apiId" :type="detail.type" :cname="detail.apiServiceCName" @toggle="toggleOfflineVisible"></offline-dialog>
    <apply-dialog v-if="user.userId && loadApply" :visible="applyDialogVisible" :id="apiId" :chargeType="detail.chargeType" :resourceType="detail.resourceType" @toggle="toggleApplyVisible"></apply-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  import showdown from 'showdown'
  export default {
    data: function() {
      return {
        apiId:  '',
        detail: {
          tagsName: '',
          attentionFlag: false
        },
        activeTab: 0,
        apiActiveTab: 0,
        loading: true,
        offlineDialogVisible: false,
        applyDialogVisible: false,
        loadOffline: false,
        loadApply: false,
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
      isRealAuth () {
        return this.user.userType && this.user.userType !== 'REGISTER'
      }
    },
    mounted () {
      
    },
    watch: {
      
    },
    created () {
      this.apiId = this.$route.params.id
      this.getDetail()
    },
    methods: {
      handleScore () {
        API.Api.addScore({
          apiServiceId: this.apiId,
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
      getDetail () {
        API.Api.getApiDetail({
          apiServiceId: this.apiId
        }).then((res) => {
          this.detail = res.result
          this.handleMarkdown()
          this.loading = false
        })
      },
      switchTab (index) {
        this.activeTab = index
      },
      switchApiTab (index) {
        this.apiActiveTab = index
      },
      handleMarkdown () {
        let converter = new showdown.Converter({
            omitExtraWLInCodeBlocks: true,
            noHeaderId: false,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: false,
            ghCodeBlocks: true,
            tasklists: true,
            smoothLivePreview: true,
            prefixHeaderId: false,
            disableForced4SpacesIndentedSublists: false
        });

        _.each(this.detail.apiList,function(item) {
            item.testPacket = converter.makeHtml(item.testPacket)
            item.directions = converter.makeHtml(item.directions)
        });

        this.detail.rtnCode = converter.makeHtml(this.detail.rtnCode)
      },
      applyApi () {
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
          API.Api.unfollowApi({
            apiServiceId: this.detail.apiServiceId
          }).then((res) => {
            if(res.status === 'OK') {
              this.detail.attentionFlag = false
              this.detail.attentionCnt = this.detail.attentionCnt - 1
            }else {

            }
          })
        }else {
          // 关注
          API.Api.followApi({
            apiServiceId: this.detail.apiServiceId
          }).then((res) => {
            if(res.status === 'OK') {
              this.detail.attentionFlag = true
              this.detail.attentionCnt = this.detail.attentionCnt + 1
            }else {
              
            }
          })
        }
      }
    },
    components: {
      'offline-dialog': () => import('components/offline'),
      'apply-dialog': () => import('../components/applyApi'),
      'c-share': () => import('components/share')
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  @import '../../../assets/css/markdown.css';
  .content {
    margin-top: 0;
    background: #fff;
    .detail-header {
      padding: 30px 0 20px 0;
      // height: 175px;
      overflow: hidden;
      box-sizing: border-box;
      .detial-header-left {
        width: 75%;
        float: left;
        // height: 125px;
        position: relative;
        .header-title {
          padding: 10px 0;
          width: 80%;
          h1 {
            display: inline-block;
            margin-right: 25px;
          }
          .tag {
            border: 1px solid #ddd;
            padding: 5px 10px;
            border-radius: 10px;
            margin-right: 20px;
            margin-bottom: 5px;
            color: #999;
            display: inline-block;
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
              padding: 2px 15px 0 25px;
              margin-left: 10px;
              border-right: 1px solid #ccc;
              &:last-child {
                border-right: 0;
              }
            }
            .api-apply {
              background: url(../../../assets/images/apply-icon.png) left center no-repeat;
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
          color: @priceTextColor;
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
        .btn-apply {
          margin-bottom: 45px;
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
      .detail-main-tabs {
        height: 40px;
        line-height: 40px;
        a {
          margin-right: 30px;
          color: #333;
          display: block;
          box-sizing: border-box;
          float: left;
          width: 100px;
          text-align: center;
          &.active {
            padding: 0 20px;
            border: 1px solid @mainBackground;
            color: @linkColorHover;
            border-radius: 15px;
            height: 40px;
            line-height: 40px;
          }
          
        }
      }
      .detail-main-content {
        margin-top: 40px;
        overflow: hidden;
        .detail-main-left {
          width: 15%;
          float: left;
          box-sizing: border-box;
          border-right: 1px solid #ccc;
          min-height: 300px;
          a {
            padding: 0 10px;
            margin: 20px 0;
            display: block;
            color: #666;
            &:first-child {
              margin-top: 10px;
            }
            &.active {
              color: @mainBackground;
              border-left: 2px solid @mainBackground;
            }
          }
        }
        .detail-main-right {
          width: 85%;
          float: left;
          padding: 10px 65px;
          box-sizing: border-box;
          p {
            line-height: 20px;
            margin-bottom: 12px;
            font-size: 12px;
          }
        }
        .detail-main-pane {
          padding: 0 0 30px 20px;
          .sub-package-title {
            color: #ef6f08;
          }
          h4 {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>