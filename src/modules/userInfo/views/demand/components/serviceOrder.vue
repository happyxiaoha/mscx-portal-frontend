<template>
  <el-dialog :title="loadApiOrderDetail ? '方案详情' : '接单人详情'" custom-class="service-form-dialog" :visible.sync="dialogVisible" :before-close="handleClose" >
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
            <td>{{ new Date(item.createdTime).format('yyyy-MM-dd')}}</td>
            <td>{{ item.contactUsername }}</td>
            <td>{{ item.contactPhone }}</td>
            <td>{{ item.statusName }}</td>
            <td>
              <template v-if="item.status === 'P'">
                <a href="javascript:;" @click="showServicePlanInfo(item.id)">查看方案</a>
                <a href="javascript:;" @click="ensureServicePlanInfo(item.id)">确认</a>
                <a href="javascript:;" @click="refuseServicePlanInfo(item.id)">拒绝</a>
              </template>
              <template v-else>
                <a href="javascript:;" @click="showServicePlanInfo(item.id)">查看方案</a>
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
    <service-order-info v-if="loadApiOrderDetail" @back="handleDetailBack" :detailId="detailId"></service-order-info>
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
          reqId: this.id,
          page: 1,
          pageSize: 5
        }
      }
    },
    created () {
      if(this.id !== '') {
        this.queryServiceOrder()
      }
    },
    methods: {
      queryServiceOrder () {
        this.loading = true
        API.Demand.queryServiceOrder(this.params).then((res) => {
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
        this.queryServiceOrder()
      },
      showServicePlanInfo (id){
        this.detailId = id
        this.loadApiOrderDetail = true
      },
      handleDetailBack () {
        this.loadApiOrderDetail = false
      },
      ensureServicePlanInfo (id) {
        API.Demand.confirmServiceOrder({
          reqId: this.id,
          id: id
        }).then((res) => {
          this.$message({
            message: '确认接单成功',
            type: 'success'
          });
          this.params.page = 1
          this.queryServiceOrder()
        }).catch(() => {
          this.$message({
            message: '确认接单失败',
            type: 'warning'
          });
        })
      },
      refuseServicePlanInfo (id) {
        API.Demand.refuseServiceOrder({
          reqId: this.id,
          id: id
        }).then((res) => {
          this.$message({
            message: '拒绝接单成功',
            type: 'success'
          });
          this.params.page = 1
          this.queryServiceOrder()
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
          this.params.reqId = this.id
          this.queryServiceOrder()
        }
      }
    },
    components: {
      'service-order-info': () => import('./serviceOrderDetail'),
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