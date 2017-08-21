<template>
  <el-dialog :title="loadApiOrderDetail ? '接单人详情' : '方案详情'" custom-class="service-form-dialog" :visible.sync="dialogVisible" :before-close="handleClose" >
    <table v-show="!loadApiOrderDetail" class="table" v-loading="loading">
      <thead>
        <tr>
          <th>序号</th>
          <th>时间</th>
          <th>接单人</th>
          <th>电话</th>
          <th>订单状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="apiOrderList.length > 0">
          <tr v-for="(item, index) in apiOrderList">
            <td>{{ index + 1 }}</td>
            <td>{{ new Date(item.orderTime).format('yyyy-MM-dd')}}</td>
            <td>{{ item.contactUsername }}</td>
            <td>{{ item.contactPhone }}</td>
            <td>{{ item.statusName }}</td>
            <td>
              <template v-if="item.statusCode === 'P'">
                <a href="javascript:;" @click="showApiPlanInfo(item.id)">查看方案</a>
                <a href="javascript:;" @click="ensureApiPlanInfo(item.id)">确认</a>
                <a href="javascript:;" @click="refuseApiPlanInfo(item.id)">拒绝</a>
              </template>
              <template v-else>
                <a href="javascript:;" @click="showApiPlanInfo(item.id)">查看方案</a>
              </template>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="6">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div v-show="!loadApiOrderDetail" class="page-wrapper" v-if="pageInfo.totalSize > 5">
      <el-pagination
        layout="prev, pager, next"
        @current-change="jumpPage"
        :current-page.sync="pageInfo.currentPage"
        :page-size="5"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
    <api-order-info v-if="loadApiOrderDetail" @back="handleDetailBack" :detailId="detailId"></api-order-info>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    props: ['visible', 'id'],
    data () {
      return {
        loadApiOrderDetail: false,
        loading: false,
        detailId: '',
        dialogVisible: this.visible,
        apiOrderList: [],
        pageInfo: {
          totalSize: 0
        },
        params: {
          id: this.id,
          page: 1,
          pageSize: 5
        }
      }
    },
    created () {
      if(this.id !== '') {
        this.queryApiOrder()
      }
    },
    methods: {
      queryApiOrder () {
        this.loading = true
        API.Demand.queryApiOrder(this.params).then((res) => {
          this.loading = false
          this.apiOrderList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      handleClose (done) {
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      resetParams () {
        this.params.page = 1
        this.params.pageSize = 5
      },
      jumpPage (page) {
        this.params.page = page
        this.queryApiOrder()
      },
      showApiPlanInfo (id){
        this.detailId = id
        this.loadApiOrderDetail = true
      },
      handleDetailBack () {
        this.loadApiOrderDetail = false
      },
      ensureApiPlanInfo (id) {
        API.Demand.confirmApiOrder({
          reqId: this.id,
          id: id
        }).then((res) => {
          this.$message({
            message: '确认接单成功',
            type: 'success'
          });
          this.params.page = 1
          this.queryApiOrder()
        }).catch(() => {
          this.$message({
            message: '确认接单失败',
            type: 'warning'
          });
        })
      },
      refuseApiPlanInfo (id) {
        API.Demand.refuseApiOrder({
          reqId: this.id,
          id: id
        }).then((res) => {
          this.$message({
            message: '拒绝接单成功',
            type: 'success'
          });
          this.params.page = 1
          this.queryApiOrder()
        }).catch(() => {
          this.$message({
            message: '拒绝接单失败',
            type: 'warning'
          });
        })
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      id () {
        if(this.id !== '') {
          this.params.id = this.id
          this.queryApiOrder()
        }
      }
    },
    components: {
      'api-order-info': () => import('./apiOrderDetail'),
    }
  }
</script>
<style lang="less">
  .service-form-dialog {
    width: 550px;
    position: relative;
    height: 400px;
    overflow: auto;
    .form {
      .service-form-tip {
        font-size: 12px;
        margin-top: 3px;
        color: #aaa;
      }
      .el-form-item__content {
        width: 70%;
      }
    }
    
  }
</style>