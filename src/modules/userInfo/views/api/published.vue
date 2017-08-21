<template>
  <div class="api-publish" v-loading="loading">
    <el-button class="btn-add" @click="jumpPublish" type="primary">发布API</el-button>
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th>API名称</th>
          <th>API描述</th>
          <th>申请次数</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="apiList.length > 0">
          <tr v-for="(item, index) in apiList">
            <td v-if="item.status == '0'">
              <a target="_blank" :href="'api.html#detail/'+ item.apiServiceId">{{ item.apiServiceCName || '-' }}</a>
            </td>
            <td v-else>
              <a target="_blank" :href="'api.html#desc/' + item.apiServiceId">{{ item.apiServiceCName || '-' }}</a>
            </td>
            <td>{{item.description}}</td>
            <td>{{item.applyCount || '-' }}</td>
            <td>{{item.statusDesc}}</td>
            <td>
              <template v-if="item.status == '0'">
                <a v-if="item.chargeType == '02'" href="javascript:;" @click="changePrice(item.apiServiceId)">调价</a>
                <a :href="'api.html#update/' + item.apiServiceId">编辑</a>
                <a href="javascript:;" @click="downApi(item.apiServiceId)">下架</a>
              </template>
              <template v-else-if="item.status == '3'">
                <!-- <a href="javascript:;" class="displayMes">查看</a> -->
                <a v-if="item.chargeType == '02'" href="javascript:;" @click="changePrice(item.apiServiceId)">调价</a>
                <a :href="'api.html#update/' + item.apiServiceId" class="updateApi">编辑</a>
                <a v-if="item.isOnline == 'N'" href="javascript:;" @click="deleteApi(item.apiServiceId)">删除</a>
                <a v-else href="javascript:;" @click="downApi(item.apiServiceId)">下架</a>
              </template>
            </td>
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
    <charge-form-dialog 
      type="api"
      v-if="loadChargeForm"
      :defaultIndex="chargeDefaultIndex"
      :visible="chargeFormDialogVisible"
      :serviceId="activeId"
      @submit="handleChargeFormSubmit"
      @toggle="toggleChargeFormVisible"></charge-form-dialog>
    <charge-table-dialog 
      type="api" 
      v-if="loadChargeTable" 
      :id="activeId" 
      :visible="chargeTableDialogVisible"  
      @submit="handleChargeTableSubmit" 
      @toggle="toggleChargeTableVisible"
      @addChargeRule="invokeAddChargeForm"
      @updateChargeRule="invokeUpdateChargeForm"></charge-table-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  export default {
    data () {
      return {
        activeId: '',
        loadChargeForm: false,
        chargeDefaultIndex: '',
        chargeFormDialogVisible: false,
        loadChargeTable: false,
        chargeTableDialogVisible: false,
        loading: false,
        apiList: {},
        deleteId: '',
        pageInfo: {
          totalSize: 0
        },
        params: {
          page: 1,
          pageSize: 10,
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
    computed: {
      chargeRuleList () {
        return this.$store.getters.chargeRuleList
      }
    },
    methods: {
      toggleChargeFormVisible (arg) {
        this.chargeFormDialogVisible = arg
      },
      toggleChargeTableVisible (arg) {
        this.chargeTableDialogVisible = arg
      },
      queryApi () {
        this.loading = true
        this.apiList = []
        API.Api.getMyPublishedApi(this.params).then((res) => {
          this.loading = false
          this.apiList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      jumpPublish () {
        location.href = 'api.html#create'
      },
      deleteApi (id) {
        this.$confirm('确认删除这条API吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Api.deleteApi({
            apiServiceId: id
          }).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.queryApi()
          }).catch((res) => {
            this.$message({
              message: res.message || '删除失败',
              type: 'warning'
            });
          })
        })
      },
      downApi (id) {
        this.$confirm('确认下架这条API吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Api.offlineServiceApi({
            apiServiceId: id
          }).then((res) => {
            this.$message({
              message: '下架成功',
              type: 'success'
            });
            this.queryApi()
          }).catch((res) => {
            this.$message({
              message: res.message || '下架失败',
              type: 'warning'
            });
          })
        })
      },
      changePrice (id) {
        this.activeId = id
        this.loadChargeTable = true
        this.chargeTableDialogVisible = true
      },
      handleChargeFormSubmit (arg) {
        if(this.chargeDefaultIndex !== '') {
          this.$store.commit('updateChargeRule', {
            chargeRuleIndex: this.chargeDefaultIndex,
            chargeRule: arg
          })
        }else {
          this.$store.commit('addChargeRule', arg)
        }
        this.chargeDefaultIndex = ''
        // 套餐form提交完成后，继续显示调价table
        setTimeout(() => {
          this.changePrice(this.activeId)
        }, 500)
      },
      handleChargeTableSubmit () {
        this.queryApi()
      },
      invokeAddChargeForm () {
        this.chargeTableDialogVisible = false
        setTimeout(() => {
          this.loadChargeForm = true
          this.chargeFormDialogVisible = true
        }, 500)
      },
      invokeUpdateChargeForm (index) {
        this.chargeTableDialogVisible = false
        setTimeout(() => {
          this.loadChargeForm = true
          this.chargeDefaultIndex = index
          this.chargeFormDialogVisible = true
        }, 500)
      }
    },
    components: {
      'charge-form-dialog': () => import('components/chargeRule'),
      'charge-table-dialog': () => import('components/chargeTable'),
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .api-publish {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    .btn-add {
      margin-bottom: 20px;
    }
  }
</style>