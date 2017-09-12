<template>
  <div>
    <div class="user-default-account">
      <div class="default-top">
        <h2>我的首页</h2>
        <div class="default-oper">
          <el-button class="btn-apply-service" @click="goServiceList">申请服务</el-button>
          <el-button class="btn-publish-service" @click="goServiceCreate">发布服务</el-button>
        </div>
      </div>
      <div class="default-bottom">
        <ul>
          <li>
            <h1>{{cash}}</h1>
            <p>累计消费金额</p>
          </li>
          <li>
            <h1>{{focusApi}}</h1>
            <p>关注API</p>
          </li>
          <li>
            <h1>{{focusApp}}</h1>
            <p>关注服务</p>
          </li>
          <li>
            <h1>{{applyApi}}</h1>
            <p>申请API</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-default-api">
      <div class="default-api-title">
        <h2>我申请的API</h2>
        <a href="#/api/ordered">更多</a>
      </div>
      <div class="default-api-content">
        <div class="default-not-found" v-if="applyList.length < 1">
          <img src="../images/not-found.png">
          <h2>你还没有申请任何API</h2>
          <el-button type="primary" @click="goApiList">快去申请API</el-button>
        </div>
        <c-api-item v-for="item in applyList" cols="4" :itemObj="item" :key="item.sourceId"></c-api-item>
      </div>
    </div>
    <div class="user-default-service">
      <div class="default-service-title">
        <h2>我关注的服务</h2>
        <a href="#/service/follow">更多</a>
      </div>
      <div class="default-service-content">
        <div class="default-not-found" v-if="focusList.length < 1">
          <img src="../images/not-found.png">
          <h2>你还没有关注任何服务</h2>
          <el-button type="primary" @click="goServiceList">快去寻找服务</el-button>
        </div>
        <c-app-item v-for="item in focusList" :itemObj="item" :key="item.id"></c-app-item>
      </div>
    </div>
  </div>
</template>
<script>
  import apiItem from 'components/apiItem'
  import appItem from 'components/appItem'
  import API from 'common/api'
  export default {
    data () {
      return {
        cash: 0,
        focusApi: 0,
        focusApp: 0,
        applyApi: 0,
        applyList: '',
        focusList: ''
      }
    },
    created () {
      // 获取我申请的API
      API.Order.getSelfApiList({
        pageSize: 4,
        page: 1
      }).then((res) => {
        this.applyList = res.result.list
      })
      // 获取用户基本信息 
      API.Common.dashboard().then((res) => {
        this.cash = res.result.cash
        this.focusApi = res.result.focusApi
        this.focusApp = res.result.focusApp
        this.applyApi = res.result.applyApi
      })
      // 获取我关注的服务
      API.App.getFollowService({
        page: 1,
        pageSize: 4
      }).then((res) => {
        this.focusList = res.result.list
      })
      
    },
    methods: {
      goServiceList() {
        location.href = '/services/'
      },
      goServiceCreate() {
        location.href = '/services/create'
      },
      goApiList() {
        location.href = '/api/'
      }
    },
    components: {
      'c-api-item': apiItem,
      'c-app-item': appItem
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .user-default-account {
    box-sizing: border-box;
    height: 200px;
    background: #fff;
    .box-shadow();
    .default-top {
      height: 65px;
      line-height: 65px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      padding: 0 30px 0 40px;
      h2 {
        float: left;
      }
      .default-oper {
        float: right;
        text-align: right;
      }
      .btn-apply-service {

      }
      .btn-publish-service {
        
      }
    }
    .default-bottom {
      padding: 25px 35px;
      overflow: hidden;
      ul {
        overflow: hidden;
        width: 100%;
      }
      li {
        float: left;
        height: 85px;
        width: 25%;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
        text-align: center;
        padding: 15px 0;
        &:last-child {
          border-right: 0;
        }
        p {
          margin-top: 15px;
          color: #999;
        }
      }
    }
  }
  .user-default-api {
    margin-top: 25px;
    overflow: hidden;
    .default-api-title {
      overflow: hidden;
      h2 {
        float: left;
      }
      a {
        float: right;
      }
    }
    .default-api-content {
      margin-top: 20px;
    }
  }
  .user-default-service {
    margin-top: 25px;
    overflow: hidden;
    .default-service-title {
      overflow: hidden;
      h2 {
        float: left;
      }
      a {
        float: right;
      }
    }
    .default-service-content {
      margin-top: 20px;
    }
  }
  .default-not-found {
    padding: 25px 0;
    min-height: 170px;
    background: #fff;
    text-align: center;
    h2 {
      margin: 10px 0;
    }
  }
</style>