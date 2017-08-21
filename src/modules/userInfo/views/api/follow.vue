<template>
  <div class="api-ordered" v-loading="loading">
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th width="20%">API名称</th>
          <th width="50%">API描述</th>
          <th width="15%">关注时间</th>
          <th width="15%">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="apiList.length > 0">
          <tr v-for="(item, index) in apiList">
            
            <td v-if="item.status == '0'">
              <a target="_blank" :href="'api.html#detail/' + item.apiServiceId">{{ item.apiServiceCName }}</a>
            </td>
            <td v-else>{{ item.apiServiceCName }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.attentionTime ? new Date(item.attentionTime).format('yyyy-MM-dd HH:mm:ss') : '-' }}</td>
            <td>
              <a @click="cancelFollow(item.apiServiceId)" href="javascript:;">取消关注</a>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4">暂无数据</td>
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
        apiList: {},
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
          this.queryApi()
        },
        deep: true
      }
    },
    created () {
      this.queryApi()
    },
    methods: {
      queryApi () {
        this.loading = true
        this.apiList = []
        API.Api.getMyAttentionApi(this.params).then((res) => {
          this.loading = false
          this.apiList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      cancelFollow (id) {
        API.Api.cancelFollow({
          apiServiceId: id
        }).then((res) => {
          this.$message({
            message: '取消关注成功',
            type: 'success'
          });
          this.queryApi()
        }).catch(() => {
          this.$message({
            message: '取消关注失败',
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
  .api-ordered {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
  }
</style>