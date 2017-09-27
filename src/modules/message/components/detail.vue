<template>
  <el-dialog :title="type === 'resource' ? '授权资源详情' : '调用记录详情'" custom-class="charge-table-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-button type="primary" @click="exportExcel">导出到excel</el-button>
    <table class="table" v-if="type === 'resource'">
      <thead>
        <tr>
          <th>序号</th>
          <th>授权资源</th>
          <th>授权价格</th>
          <th>授权时间</th>
          <th>授权人</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="list && list.length > 0">
          <tr v-for="(item, index) in list">
            <td>{{ +pageInfo.startIndex + +index + 1 }}</td>
            <td>{{item.sourceName}}</td>
            <td>{{item.sourceMoney}}元/次</td>
            <td>{{item.createdTime ? new Date(item.createdTime).format('yyyy-MM-dd') : '-'}}</td>
            <td>{{item.createdBy}}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="5">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-else>
      <thead>
        <tr>
          <th>序号</th>
          <th>调用时间</th>
          <th>调用资源</th>
          <th>授权价格</th>
          <th>是否调用成功</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="list && list.length > 0">
          <tr v-for="(item, index) in list">
            <td>{{ +pageInfo.startIndex + +index + 1 }}</td>
            <td>{{item.accessTime ? new Date(item.accessTime).format('yyyy-MM-dd HH:mm') : '-'}}</td>
            <td>{{item.sourceName}}</td>
            <td>{{item.sourceMoney}}元/次</td>
            <td>{{item.flag}}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="5">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="page-wrapper" v-if="pageInfo.totalSize > 10">
      <el-pagination
        layout="prev, pager, next"
        @current-change="jumpPage"
        :current-page.sync="pageInfo.currentPage"
        :page-size="10"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    props: ['visible', 'type', 'resId'],
    data () {
      return {
        dialogVisible: this.visible,
        list: [],
        pageInfo: {
          totalSize: 0
        },
        params: {
          page: 1,
          pageSize: 10,
          contractNum: this.resId
        }
      }
    },
    computed: {
      isTypeRes () {
        return this.type === 'resource'
      },
      isTypeInvoke () {
        return this.type === 'invoke'
      }
    },
    created () {
      if(this.resId) {
        this.getDetail()
      }
    },
    methods: {
      handleClose (done) {
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      getDetail() {
        if(this.isTypeRes) {
          API.Contract.getResourceInfo(this.params).then((res) => {
            this.list = res.result.list || {}
            this.pageInfo = res.result.page || {}
          })
        }else if(this.isTypeInvoke) {
          API.Contract.getInvokeInfo(this.params).then((res) => {
            this.list = res.result.list || {}
            this.pageInfo = res.result.page || {}
          })
        }
      },
      jumpPage (page) {
        this.params.page = page
      },
      exportExcel () {
        if(this.isTypeRes) {
          window.open(API.Contract.resourceInfoExcelUrl + '?contractNum=' + this.resId)
        }else {
          window.open(API.Contract.invokeInfoExcelUrl + '?contractNum=' + this.resId)
        }
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      resId () {
        if(this.resId) {
          this.getDetail()
        }
      },
      type () {
        this.getDetail()
      },
      params: {
        handler (val) {
          this.getDetail()
        },
        deep: true
      }
    }
  }
</script>
<style lang="less" scoped>
  .charge-table-dialog {
    position: relative;
    overflow: auto;
    .table {
      margin-top: 20px;
    }
  }
</style>