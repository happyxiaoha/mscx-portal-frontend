<template>
  <div class="demand-follow">
    <el-tabs type="border-card">
      <el-tab-pane label="关注的服务需求">
        <table class="table usercenter-table">
          <thead>
            <tr>
              <th>服务任务名称</th>
              <th>发布人</th>
              <th>预算金额</th>
              <th>浏览次数</th>
              <th>关注时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="service.list.length > 0">
              <tr v-for="item in service.list">
                <td>
                  <a :href="'demand.html#service/detail/' + item.serviceId">{{item.name}}</a>
                </td>
                <td>{{item.publisher}}</td>
                <td>{{item.money}}</td>
                <td>{{item.pageviewAmount}}</td>
                <td>{{item.focusTime ? new Date(item.focusTime).format('yyyy-MM-dd') : '-'}}</td>
                <td>
                  <a href="javascript:;" @click="cancelServiceFocus(item.serviceId)">取消关注</a>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6">暂无数据</td>
            </tr>
          </tbody>
        </table>
        <div class="page-wrapper" v-if="service.pageInfo.totalSize > 10">
          <el-pagination
            layout="prev, pager, next"
            @current-change="jumpServicePage"
            :current-page.sync="service.pageInfo.currentPage"
            :page-size="10"
            :total="service.pageInfo.totalSize">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注的API需求">
        <table class="table usercenter-table">
          <thead>
            <tr>
              <th>API任务名称</th>
              <th>发布人</th>
              <th>预算金额</th>
              <th>浏览次数</th>
              <th>关注时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="api.list.length > 0">
              <tr v-for="item in api.list">
                <td>
                  <a :href="'demand.html#api/detail/' + item.id">{{item.sysName}}</a>
                </td>
                <td>{{item.pulibsher}}</td>
                <td>{{item.preOffer}}</td>
                <td>{{item.pageviewAmount}}</td>
                <td>{{item.focusTime ? new Date(item.focusTime).format('yyyy-MM-dd') : '-'}}</td>
                <td>
                  <a href="javascript:;" @click="cancelApiFocus(item.id)">取消关注</a>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6">暂无数据</td>
            </tr>
          </tbody>
        </table>
        <div class="page-wrapper" v-if="api.pageInfo.totalSize > 10">
          <el-pagination
            layout="prev, pager, next"
            @current-change="jumpApiPage"
            :current-page.sync="api.pageInfo.currentPage"
            :page-size="10"
            :total="api.pageInfo.totalSize">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import API from 'common/api'
  require('common/utils/date')
  export default {
    data () {
      return {
        service: {
          list: [],
          pageInfo: {},
          params: {
            page: 1,
            pageSize: 10
          }
        },
        api: {
          list: [],
          pageInfo: {},
          params: {
            page: 1,
            pageSize: 10
          }
        }
      }
    },
    created () {
      this.queryServiceFocus()
      this.queryApiFocus()
    },
    methods: {
      queryServiceFocus () {
        API.Demand.queryServiceFocus(this.service.params).then((res) => {
          this.service.list = res.result.list
          this.service.pageInfo = res.result.page
        })
      },
      queryApiFocus() {
        API.Demand.queryApiFocus(this.api.params).then((res) => {
          this.api.list = res.result.list
          this.api.pageInfo = res.result.page
        })
      },
      cancelServiceFocus (id) {
        API.Demand.cancelServiceFocus({
          serviceId: id
        }).then((res) => {
          this.$message({
            message: '取消关注成功',
            type: 'success'
          });
          this.queryServiceFocus()
        }).catch(() => {
          this.$message({
            message: '取消关注失败',
            type: 'warning'
          });
        })
      },
      cancelApiFocus (id) {
        API.Demand.reduceApiFocus({
          id: id
        }).then((res) => {
          this.$message({
            message: '取消关注成功',
            type: 'success'
          });
          this.queryApiFocus()
        }).catch(() => {
          this.$message({
            message: '取消关注失败',
            type: 'warning'
          });
        })
      },
      jumpServicePage (page) {
        this.service.params.page = page
        this.queryServiceFocus()
      },
      jumpApiPage (page) {
        this.api.params.page = page
        this.queryApiFocus()
      }
    }
  }
</script>
<style lang="less">
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .demand-follow {
    // .box-shadow();
    // box-sizing: border-box;
    // padding: 29px 25px;
    background: #fff;
    
  }
</style>