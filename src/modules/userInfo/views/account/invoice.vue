<template>
  <div class="account-invoice">
    <div>
      <el-button type="primary" @click="showForm">新增发票申请</el-button>
      <div class="invoice-tool">
        <el-input v-model="params.taxpayerName" class="invoice-search-ipt" placeholder="输入发票抬头" @keydown.enter.native="search"></el-input>
        <el-button @click="search" type="primary">搜索</el-button>
      </div>
    </div>
    <table class="table usercenter-table">
        <thead>
        <tr>
          <th width="8%">序号</td>
          <th width="12%">发票类型</th>
          <th width="10%">发票金额</th>
          <th width="18%">发票抬头</th>
          <th width="10%">发票时间</th>
          <th width="10%">收取方式</th>
          <th width="20%">邮寄地址</th>
          <th width="12%">发票状态</th>
        </tr>
        </thead>
        <tbody>
          <template v-if="result.list.length > 0">
            <tr v-for="(item, index) in result.list">
              <td>{{ +pageInfo.startIndex + +index + 1 }}</td>
              <td>{{ item.invoiceType }}</td>
              <td>{{ item.applyAmount }}</td>
              <td>{{ item.taxpayerName }}</td>
              <td>{{ new Date(item.applyTime).format('yyyy-MM-dd') }}</td>
              <td>{{ item.tokenType }}</td>
              <td>{{ item.mailAddress }}</td>
              <td>{{ item.invoiceStatus }}</td>
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
    <form-dialog v-if="loadForm" :amountLimit="amountLimit" :visible="formDialogVisible"  @submit="handleFormSubmit" @toggle="toggleFormVisible"></form-dialog>
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
        loadForm: false,
        formDialogVisible: false,
        params: {
          page: 1,
          pageSize: 5,
          taxpayerName: ''
        },
        amountLimit: ''
      }
    },
    created () {
      API.Order.enableAccount().then((res) => {
        this.amountLimit = res.result
      })
      this.queryInvoices()
    },
    watch: {
    },
    methods: {
      jumpPage (page) {
        this.params.page = page
        this.queryInvoices()
      },
      queryInvoices () {
        API.Order.queryInvoices(this.params).then((res) => {
          this.result.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      search () {
        this.params.page = 1
        this.queryInvoices()
      },
      showForm () {
        this.loadForm = true
        this.formDialogVisible = true
      },
      toggleFormVisible (arg) {
        this.formDialogVisible = arg
      },
      handleFormSubmit () {

      }
    },
    components: {
      'form-dialog': () => import('./components/invoiceForm'),
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .account-invoice {
    .box-shadow();
    // height: 300px;
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    margin-bottom: 20px;
    .invoice-tool {
      float: right;
      .invoice-search-ipt {
        display: inline-block;
        width: 200px;
      }
    }
    .table {
      margin-top: 20px;
    }
  }
</style>