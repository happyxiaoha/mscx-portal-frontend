<template>
  <div class="order-list" v-loading="loading">
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th>订单号</th>
          <th>资源名称</th>
          <th>买家名称</th>
          <th>申请时间</th>
          <th>申请单价</th>
          <th>申请次数</th>
          <th>总金额</th>
          <th>订单状态</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="orderList.length > 0">
          <tr v-for="(item, index) in orderList">
            <td>{{ item.orderNum }}</td>
            <td>{{ item.resourceName }}</td>
            <td>{{ item.orderUserName }}</td>
            <td>{{ new Date(item.createdTime).format('yyyy-MM-dd HH:mm:ss') }}</td>
            <td>{{ item.itemCash }}</td>
            <td>{{ item.itemNumber }}</td>
            <td>{{ item.itemCashTotal }}</td>
            <td>{{ item.orderStatusTxt }}</td>
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
  </div>
</template>
<script>
  import API from 'common/api'
  require('common/utils/date')
  export default {
    data () {
      return {        
        loading: false,
        orderList: {},
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
          this.getSaledOrderList()
        },
        deep: true
      }
    },
    created () {
      this.getSaledOrderList()
    },
    methods: {
      getSaledOrderList () {
        this.loading = true
        this.orderList = []
        API.Common.getSaledOrderList(this.params).then((res) => {
          this.loading = false
          this.orderList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .order-list {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
  }
</style>