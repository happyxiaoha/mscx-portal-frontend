<template>
  <div class="service-follow" v-loading="loading">
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th width="8%">微应用名称</th>
          <th width="8%">服务商</th>
          <th width="8%">提供方式</th>
          <th width="8%">浏览次数</th>
          <th width="18%">关注时间</th>
          <th width="18%">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="serviceList.length > 0">
          <tr v-for="(item, index) in serviceList">
            
            <td>
              <a target="_blank" :href="'/services/detail/' + item.id">{{ item.name }}</a>
            </td>
            <td>{{ item.providerName }}</td>
            <td>{{ item.serviceType }}</td>
            <td>{{ item.viewCount }}</td>
            <td>{{ item.attentionTime ? new Date(item.attentionTime).format('yyyy-MM-dd HH:mm:ss') : '-' }}</td>
            <td>
              <a @click="cancelFollow(item.id)" href="javascript:;">取消关注</a>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="6">暂无数据</td>
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
  </div>
</template>
<script>
  import API from 'common/api'
  require('common/utils/date')
  export default {
    data () {
      return {        
        loading: false,
        serviceList: {},
        pageInfo: {
          totalSize: 0
        },
        params: {
          page: 1,
          pageSize: 5,
        }
      }
    },
    watch: {
      params: {
        handler (val) {
          this.queryService()
        },
        deep: true
      }
    },
    created () {
      this.queryService()
    },
    methods: {
      queryService () {
        this.loading = true
        this.serviceList = []
        API.App.getFollowService(this.params).then((res) => {
          this.loading = false
          this.serviceList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      cancelFollow (id) {
        API.App.unfollowApp({
          id: id
        }).then((res) => {
          this.$message({
            message: '取消关注成功',
            type: 'success'
          });
          this.queryService()
        }).catch((res) => {
          this.$message({
            message: res.message || '取消关注失败',
            type: 'warning'
          });
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .service-follow {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
  }
</style>