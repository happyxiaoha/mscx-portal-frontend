<template>
  <div class="api-ordered" v-loading="loading">
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th width="15%">购买时间</th>
          <th width="10%">SaaS名称</th>
          <th width="8%">服务商</th>
          <th width="8%">收费类型</th>
          <th width="8%">使用次数</th>
          <th width="8%">剩余次数</th>
          <th width="35%">链接地址</th>
          <th width="8%">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="apiList.length > 0">
          <tr v-for="(item, index) in apiList">
            <td>{{item.applyTime ? new Date(parseInt(item.applyTime)).format('yyyy-MM-dd') : '-'}}</td>
            <td>
              <a target="_blank" :href="'/saas/detail/' + item.sourceId">{{ item.appName }}
              </a>
            </td>
            <td>{{ item.provideName }}</td>
            <td>{{ item.feeType }}</td>
            <td>{{ item.usedLimit == -1 ? '不限': item.usedLimit }}</td>
            <td>{{ item.leftLimit == -1 ? '不限': item.leftLimit }}</td>
            <td>
              <a href="javascript:;" @click="showUrl(item)" data-name="<%=msitem.appName%>" data-url="">
                {{ item.saasUrl }}
              </a>
            </td>
            <td>
              <a :href="'/saas/detail/' + item.sourceId">再次申请</a>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="8">暂无数据</td>
        </tr>
      </tbody>
    </table>
    
    <div class="page-wrapper" v-if="pageInfo.totalSize > 5">
      <el-pagination
        layout="prev, pager, next"
        @current-change="jumpPage"
        :current-page.sync="pageInfo.currentPage"
        :page-size="5"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
    <el-dialog v-if="loadDemo" :title="demoName" custom-class="fullscreen-dialog" :visible.sync="demoVisible">
      <iframe :src="demoUrl" :style="iframeStyle" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  import Axios from 'axios'
  require('common/utils/date')
  export default {
    data () {
      return {        
        loading: false,
        apiList: {},
        pageInfo: {
          totalSize: 0
        },
        loadDemo: false,
        demoVisible: false,
        demoUrl: '',
        params: {
          page: 1,
          pageSize: 5,
        }
      }
    },
    watch: {
      params: {
        handler (val) {
          this.queryApi()
        },
        deep: true
      }
    },
    computed: {
      iframeStyle: {
        cache: false,
        get() {
          let style = {};

          style.height = window.screen.availHeight + 'px';

          return style;
        }
      },
    },
    created () {
      this.queryApi()
    },
    methods: {
      queryApi () {
        // this.loading = true
        this.apiList = []
        API.Order.getSaaSList(this.params).then((res) => {
          this.loading = false
          this.apiList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      showUrl (item) {
        Axios({
          method: 'GET',
          url : location.protocol + '//' + location.host + item.saasUrl
        }).then((res) => {
          this.loadDemo = true
          this.demoVisible = true
          this.demoName = item.appName
          this.demoUrl = res.result
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .api-ordered {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
  }
  .fullscreen-dialog {
    width: 100%;
    height: 100%;
    top: 0!important;
    .el-dialog__body {
      padding: 0
    }
    iframe {
      min-height: 500px;
      display: block;
      width: 100%;
    }
  }
</style>