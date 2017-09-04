<template>
  <div class="demand-service" v-loading="loading">
    <el-button class="btn-add" @click="jumpPublish" type="primary">新增服务需求</el-button>
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th>服务需求名称</th>
          <th width="40%">服务需求描述</th>
          <th>截止日期</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="serviceList.length > 0">
          <tr v-for="(item, index) in serviceList">
            <td>
              <a target="_blank" :href="'/demand/service/desc/' + item.id">{{ item.name || '-' }}</a>
            </td>
            <td>{{item.description || '-'}}</td>
            <td>{{item.endTime}}</td>
            <td>{{item.statusName}}</td>
            <td>
              <template v-if="item.status === '0'">
                <a href="javascript:;" @click="publish(item.id)">发布</a>
                <a :href="'/demand/service/update/' + item.id">修改</a>
                <a href="javascript:;" @click="deleteService(item.id)">删除</a>
              </template>
              <template v-else-if="item.status === '2'">
                <a href="javascript:;" @click="showServiceInfo(item.id)">查看接单列表</a>
                <a href="javascript:;" @click="closeService(item.id)">关闭</a>
              </template>
              <template v-else-if="item.status === '5'">
                <a href="javascript:;" @click="showServiceInfo(item.id)">查看接单列表</a>
              </template>
            </td>
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
    <service-order-dialog v-if="loadServiceOrder" :visible="serviceOrderDialogVisible" :id="activeId"  @toggle="toggleServiceOrderVisible"></service-order-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  export default {
    data () {
      return {
        activeId: '',
        loadServiceOrder: false,
        serviceOrderDialogVisible: false,
        loading: false,
        serviceList: [],
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
          this.queryService()
        },
        deep: true
      }
    },
    created () {
      this.queryService()
    },
    methods: {
      toggleServiceOrderVisible (arg) {
        this.serviceOrderDialogVisible = arg
        this.queryService()
      },
      queryService () {
        // this.loading = true
        this.serviceList = []
        API.Demand.queryService(this.params).then((res) => {
          this.loading = false
          this.serviceList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      jumpPublish () {
        location.href = '/demand/service/create'
      },
      publish (id) {
        API.Demand.publishService({
          id: id
        }).then((res) => {
          this.$message({
            message: '发布成功，请耐心等待审核',
            type: 'success'
          });
          this.queryService()
        })
      },
      deleteService (id) {
        this.$confirm('确认删除这条服务需求吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Demand.deleteService({
            id: id
          }).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.queryService()
          })
        })
      },
      showServiceInfo (id) {
        this.activeId = id
        this.loadServiceOrder = true
        this.serviceOrderDialogVisible = true
      },
      closeService (id) {
        this.$confirm('确认关闭这条服务需求吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Demand.closeService({
            id: id
          }).then((res) => {
            this.$message({
              message: '关闭成功',
              type: 'success'
            });
            this.queryService()
          })
        })
      },
    },
    components: {
      'service-order-dialog': () => import('./components/serviceOrder'),
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .demand-service {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    .btn-add {
      margin-bottom: 20px;
    }
  }
</style>