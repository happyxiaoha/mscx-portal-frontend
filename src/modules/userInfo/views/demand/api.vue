<template>
  <div class="demand-api" v-loading="loading">
    <el-button class="btn-add" @click="jumpPublish" type="primary">新增API需求</el-button>
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th>需求方系统</th>
          <th>需求方系统描述</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="apiList.length > 0">
          <tr v-for="(item, index) in apiList">
            <td>
              <a v-if="item.statusCode === '0'|| item.statusCode === '1'" target="_blank" :href="'/demand/api/desc/' + item.id">{{item.sysName || '-'}}</a>
              <a v-else target="_blank" :href="'/demand/api/detail/' + item.id">{{item.sysName || '-'}}</a>
            </td>
            <td>{{item.sysDescription || '-'}}</td>
            <td>{{item.statusName}}</td>
            <td>
              <template v-if="item.statusCode === '0'">
                <a href="javascript:;" @click="publish(item.id)">发布</a>
                <a :href="'/demand/api/update/' + item.id">修改</a>
                <a href="javascript:;" @click="deleteApi(item.id)">删除</a>
              </template>
              <template v-else-if="item.statusCode === '2'">
                <a href="javascript:;" @click="showApiInfo(item.id)">查看接单列表</a>
                <a href="javascript:;" @click="closeApi(item.id)">关闭</a>
              </template>
              <template v-else-if="item.statusCode === '5'">
                <a href="javascript:;" @click="showApiInfo(item.id)">查看接单列表</a>
              </template>
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
    <api-order-dialog v-if="loadApiOrder" :visible="apiOrderDialogVisible" :id="activeId"  @toggle="toggleApiOrderVisible"></api-order-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  export default {
    data () {
      return {
        activeId: '',
        loadApiOrder: false,
        apiOrderDialogVisible: false,
        loading: false,
        apiList: {},
        deleteId: '',
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
          this.queryApi()
        },
        deep: true
      }
    },
    created () {
      this.queryApi()
    },
    methods: {
      toggleApiOrderVisible (arg) {
        this.apiOrderDialogVisible = arg
      },
      queryApi () {
        this.loading = true
        this.apiList = []
        API.Demand.queryApi(this.params).then((res) => {
          this.loading = false
          this.apiList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      jumpPublish () {
        location.href = '/demand/api/create'
      },
      publish (id) {
        API.Demand.publishApi({
          id: id
        }).then((res) => {
          this.$message({
            message: '发布成功，请耐心等待审核',
            type: 'success'
          });
          this.queryApi()
        })
      },
      deleteApi (id) {
        this.$confirm('确认删除这条API需求吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Demand.deleteApi({
            id: id
          }).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.queryApi()
          })
        })
      },
      showApiInfo (id) {
        this.activeId = id
        this.loadApiOrder = true
        this.apiOrderDialogVisible = true
      },
      closeApi (id) {
        this.$confirm('确认关闭这条API需求吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Demand.closeApi({
            id: id
          }).then((res) => {
            this.$message({
              message: '关闭成功',
              type: 'success'
            });
            this.queryApi()
          })
        })
      },
    },
    components: {
      'api-order-dialog': () => import('./components/apiOrder'),
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .demand-api {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    .btn-add {
      margin-bottom: 20px;
    }
  }
</style>