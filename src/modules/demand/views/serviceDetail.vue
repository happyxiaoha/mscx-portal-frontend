<template>
  <div class="detail-content" v-loading="loading">
    <div class="detail-header grid-l">
      <div class="header-title">
        <h1>{{detail.name}}</h1>
      </div>
      <div class="header-oper">
        <el-tooltip class="item" effect="dark" content="关注量" placement="top-end">
          <span class="api-view">{{detail.pageviewAmount}}</span>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="detail.attentionFlag ? '点击取消关注' : '点击关注'" placement="top-end">
          <span :class="[detail.attentionFlag ? 'active' : '' ,'api-fav']" @click="follow">{{detail.focusAmount}}</span>
        </el-tooltip>
      </div>
      <div class="header-status">
        {{detail.status == 2 ? '新任务' : '已结束'}}
      </div>
      <template v-if="detail.myself == 0 && detail.status != 5">
        <el-button v-if="!detail.billFlag" type="default" class="btn-apply" @click="applyDemand">接单</el-button>
        <el-button v-else type="default" class="btn-apply" :disabled="true">不可接单</el-button>
      </template>
    </div>
    <hr>
    <div class="detail-main grid-l">
      <div class="detail-main-top">
        <div class="detail-main-top-title">
          <h1>详情</h1>
        </div>
        <div class="detail-main-content">
          <ul>
            <li>
              <label>预算金额</label>
              <span>{{detail.money}}</span>
            </li>
            <li>
              <label>联系截止日期</label>
              <span>{{detail.endTime && new Date(detail.endTime).toISOString().slice(0,10)}}</span>
            </li>
            <li>
              <label>主联系人信息</label>
              <span>{{detail.contactUsername}}</span>
            </li>
            <li>
              <label>主联系人电话</label>
              <span>{{detail.contactPhone}}</span>
            </li>
            <li>
              <label>备用联系人信息</label>
              <span>{{detail.spareContactname}}</span>
            </li>
            <li>
              <label>备用联系人电话</label>
              <span>{{detail.spareContactphone}}</span>
            </li>
            <li>
              <label>邮箱</label>
              <span>{{detail.contactEmail}}</span>
            </li>
            <li>
              <label>地址</label>
              <span>{{detail.contactAddress}}</span>
            </li>
            <li>
              <label>是否需要平台撮合交易</label>
              <span>{{detail.matchmakeTradeName}}</span>
            </li>
            <li>
              <label>分类</label>
              <span>{{detail.categoryName}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="detail-main-bottom">
        <div class="detail-main-bottom-title">
          <h1>任务描述</h1>
        </div>
        <div class="detail-main-content">
          <ul>
            <li>
              <label>任务内容</label>
              <span>{{detail.description}}</span>
            </li>
            <li>
              <label>任务要求</label>
              <span>{{detail.required}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <apply-dialog v-if="loadApply" :visible="applyDialogVisible" :id="id" @toggle="toggleApplyVisible"></apply-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  export default {
    data: function() {
      return {
        id:  '',
        detail: {
          attentionFlag: false
        },
        loading: true,
        applyDialogVisible: false,
        loadApply: false
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    created () {
      this.id = this.$route.params.id
      this.getDetail()
      API.Demand.addServicePV({id: this.id})
    },
    methods: {
      getDetail () {
        API.Demand.getServiceDetail({
          id: this.id
        }).then((res) => {
          this.detail = res.result
          this.loading = false
        })
      },
      follow () {
        if (this.detail.attentionFlag) {
          // 取消关注
          API.Demand.unfollowServiceDemand({
            serviceId: this.detail.id
          }).then((res) => {
            if(res.status === 'OK') {
              this.detail.attentionFlag = false
              this.detail.focusAmount = this.detail.focusAmount - 1
            }else {

            }
          })
        }else {
          // 关注
          API.Demand.followServiceDemand({
            serviceId: this.detail.id
          }).then((res) => {
            if(res.status === 'OK') {
              this.detail.attentionFlag = true
              this.detail.focusAmount = this.detail.focusAmount + 1
            }else {
              
            }
          })
        }
      },
      applyDemand () {
        if(!this.user.userId) {
          location.href = 'login.html?service=' + encodeURIComponent(location.href);
        }else if(this.user.userType === 'REGISTER') {
          location.href = 'userInfo.html#userAuth';
        }else {
          this.loadApply = true
          this.applyDialogVisible = true
        }
      },
      toggleApplyVisible (arg) {
        this.applyDialogVisible = arg
        this.getDetail()
      }
    },
    components: {
      'apply-dialog': () => import('../components/applyServiceDemand')
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .detail-content {
    margin-top: 0;
    background: #fff;
    .detail-header {
      padding: 30px 0 20px 0;
      height: 135px;
      box-sizing: border-box;
      .header-title {
        padding: 10px 0;
        h1 {
          display: inline-block;
          margin-right: 25px;
        }
      }
      .header-oper {
        margin-top: 15px;
        float: left;
        span {
          padding: 2px 25px;
          border-right: 1px solid #eee;
          &:last-child {
            border-right: 0;
            margin-left: 15px;
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
      .header-status {
        margin-top: 7px;
        margin-left: 20px;
        float: left;
        background: #e3e4e8 url(../images/demand-clock-icon.png) 10px center no-repeat;
        width: 115px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        border-radius: 15px;
        font-style: italic;
        padding-left: 35px;
        font-weight: 600;
        box-sizing: border-box;
        color: #999;
      }
      .btn-apply {
        float: right;
      }
    }
    hr {
      margin: 0;
    }
    .detail-main {
      margin-top: 35px;
      .detail-main-top-title, .detail-main-bottom-title {
        height: 45px;
        line-height: 45px;
        padding-bottom: 15px;
        padding-left: 20px;
        border-bottom: 1px dashed #999;
        h1 {
          padding-left: 50px;
          background: url(../images/demand-detail-icon.png) left center no-repeat;
        }
      }
      .detail-main-bottom-title {
        h1 {
          background: url(../images/demand-task-icon.png) left center no-repeat;
        }
      }
      .detail-main-content {
        padding: 20px 0;
        li {
          height: 30px;
          line-height: 30px;
          label {
            width: 205px;
            display: inline-block;
            text-align: right;
            margin-right: 35px;
            color: #999;
          }
        }
      }
    }
  }
</style>