<template>
  <div class="demand-accept">
    <el-tabs type="border-card">
      <el-tab-pane label="服务开发需求接单">
        <table class="table usercenter-table">
          <thead>
            <tr>
              <th>服务名称</th>
              <th>预算金额</th>
              <th>截止日期</th>
              <th>接单日期</th>
              <th>需求方</th>
              <th>接单状态</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="service.list.length > 0">
              <tr v-for="item in service.list">
                <td>
                  <a :href="'demand.html#service/detail/' + item.reqId">{{item.name}}</a></td>
                <td>{{ item.money}}</td>
                <td>{{ item.endTime ? new Date(item.endTime).format('yyyy-MM-dd') : '-'}}</td>
                <td>{{ item.createdTime ? new Date(item.createdTime).format('yyyy-MM-dd') : '-'}}</td>
                <td>{{ item.reqUser}}</td>
                <td>
                  {{ item.statusName}}
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
      <el-tab-pane label="API开发需求接单">
        <table class="table usercenter-table">
          <thead>
            <tr>
              <th>需求方系统</th>
              <th>截止时间</th>
              <th>接单时间</th>
              <th>需求方</th>
              <th>接单状态</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="api.list.length > 0">
              <tr v-for="item in api.list">
                <td>
                  <a :href="'demand.html#api/detail/'+ item.reqId">{{item.sysName}}</a></td>
                <td>{{ item.endTime ? new Date(item.endTime).format('yyyy-MM-dd') : '-'}}</td>
                <td>{{ item.orderTime ? new Date(item.orderTime).format('yyyy-MM-dd') : '-'}}</td>
                <td>{{ item.reqUser }}</td>
                <td>
                    {{ item.statusName }}
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
      this.queryMyApiOrder()
      this.queryMyServiceOrder()
    },
    methods: {
      queryMyServiceOrder () {
        API.Demand.queryMyServiceOrder(this.service.params).then((res) => {
          this.service.list = res.result.list
          this.service.pageInfo = res.result.page
        })
      },
      queryMyApiOrder() {
        API.Demand.queryMyApiOrder(this.api.params).then((res) => {
          this.api.list = res.result.list
          this.api.pageInfo = res.result.page
        })
      },
      jumpServicePage (page) {
        this.service.params.page = page
        this.queryMyServiceOrder()
      },
      jumpApiPage (page) {
        this.api.params.page = page
        this.queryMyApiOrder()
      }
    }
  }
</script>
<style lang="less">
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .demand-accept {
    // .box-shadow();
    // box-sizing: border-box;
    // padding: 29px 25px;
    background: #fff;
    
  }
</style>