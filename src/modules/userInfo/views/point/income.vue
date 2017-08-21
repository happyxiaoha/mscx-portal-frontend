<template>
  <div class="point-item">
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
    <div class="fast-search">
      <span>快捷查询：</span>
      <a href="javascript:;" @click="fastSearch()">全部</a>
      <a href="javascript:;" @click="fastSearch(new Date().addDays(-30).format('yyyy-MM-dd'))">近1个月</a>
      <a href="javascript:;" @click="fastSearch(new Date().addDays(-90).format('yyyy-MM-dd'))">近3个月</a>
      <a href="javascript:;" @click="fastSearch(new Date().addDays(-180).format('yyyy-MM-dd'))">近6个月</a>
      <a href="javascript:;" @click="fastSearch(new Date().addDays(-365).format('yyyy-MM-dd'))">近1年</a>
    </div>
    <table class="table usercenter-table">
        <thead>
        <tr>
          <th width="8%"></td>
          <th width="10%">时间</th>
          <th width="10%">收入/支出</th>
          <th width="72%">详细说明</th>
        </tr>
        </thead>
        <tbody>
          <template v-if="result.list.length > 0">
            <tr v-for="(item, index) in result.list">
              <td>{{ +pageInfo.startIndex + +index + 1 }}</td>
              <td>{{ new Date(item.createdTime).format('yyyy-MM-dd') }}</td>
              <td>{{ (item.type == '0' ? '+' : '-') + item.point }}</td>
              <td>{{ item.detailedDescription }}</td>
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
        result: {
          remainingPoint: '',
          list: []
        },
        pageInfo: {
          totalSize: 0
        },
        params: {
          pageNum: 1,
          pageSize: 5
        },
        dateRange: ''
      }
    },
    created () {
      this.getIncomePointRecordList()
    },
    methods: {
      jumpPage (page) {
        this.params.pageNum = page
        this.getIncomePointRecordList()
      },
      getIncomePointRecordList () {
        API.Point.getIncomePointRecordList(this.params).then((res) => {
          this.result.list = res.result.list
          this.pageInfo = res.result.page
          this.result.remainingPoint = res.result.remainingPoint
        })
      },
      changeDate (res) {
        this.params.startTime = res.split(' - ')[0]
        this.params.endTime = res.split(' - ')[1]
      },
      search () {
        this.getIncomePointRecordList()
      },
      fastSearch (startTime) {
        if(!startTime) {
          this.params.startTime = ''
          this.params.endTime = ''
          this.dateRange = ''
        }else {
          this.params.startTime = startTime
          this.params.endTime = new Date().format('yyyy-MM-dd')
          this.dateRange = [new Date(startTime).getTime(), new Date().getTime()]
        }
        this.search()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .point-item {
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
    .fast-search {
      margin: 10px 0;
      a {
        color: #00c4c3;
        padding: 0 10px;
        border-right: 1px solid #aaa;
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
</style>