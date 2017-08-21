<template>
  <div class="point-item">
    <h1>积分规则说明</h1>
    <hr>
    <table class="table usercenter-table">
        <thead>
        <tr>
          <th width="8%"></td>
          <th width="15%">任务名称</th>
          <th width="15%">奖励积分</th>
          <th width="62%">描述</th>
        </tr>
        </thead>
        <tbody>
          <template v-if="result.list.length > 0">
            <tr v-for="(item, index) in result.list">
              <td>{{ +pageInfo.startIndex + +index + 1 }}</td>
              <td>{{ item.taskName }}</td>
              <td>{{ item.point }}</td>
              <td>{{ item.description }}</td>
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
      this.getPointRuleList()
    },
    methods: {
      jumpPage (page) {
        this.params.pageNum = page
        this.getPointRuleList()
      },
      getPointRuleList () {
        API.Point.getPointRuleList(this.params).then((res) => {
          this.result.list = res.result.list
          this.pageInfo = res.result.page
        })
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