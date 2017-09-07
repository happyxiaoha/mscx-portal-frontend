<template>
  <div class="recharge-record">
    <div>
      <span>时间：</span>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        @change="changeDate"
        placeholder="选择日期范围">
      </el-date-picker>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <table class="table usercenter-table">
        <thead>
        <tr>
          <th width="8%"></td>
          <th width="20%">名称</th>
          <th width="20%">充值金额</th>
          <th width="20%">账户余额</th>
          <th width="32%">时间</th>
        </tr>
        </thead>
        <tbody>
          <template v-if="result.list.length > 0">
            <tr v-for="(item, index) in result.list">
              <td>{{ +pageInfo.startIndex + +index + 1 }}</td>
              <td>{{ item.flowName }}</td>
              <td>{{ item.flowAmount }}</td>
              <td>{{ item.accountBalance }}</td>
              <td>{{ new Date(item.updatedTime).format('yyyy-MM-dd HH:mm:ss') }}</td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="5">暂无数据</td>
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
        result: {
          list: []
        },
        pageInfo: {
          totalSize: 0
        },
        params: {
          page: 1,
          pageSize: 5
        },
        dateRange: ''
      }
    },
    created () {
      this.getRechargeList()
    },
    methods: {
      jumpPage (page) {
        this.params.page = page
        this.getRechargeList()
      },
      getRechargeList () {
        API.Account.getRechargeList(this.params).then((res) => {
          this.result.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      changeDate (res) {
        this.params.beginTime = res.split(' - ')[0]
        this.params.endTime = res.split(' - ')[1]
      },
      search () {
        this.getRechargeList()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .recharge-record {
    .box-shadow();
    // height: 300px;
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    margin-bottom: 20px;
    .point-account {
      font-size: 18px;
      color: @mainBackground;
    }
    .table {
      margin-top: 20px;
    }
  }
</style>