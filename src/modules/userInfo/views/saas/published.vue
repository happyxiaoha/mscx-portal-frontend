<template>
  <div class="saas-publish" v-loading="loading">
    <el-button class="btn-add" @click="jumpPublish" type="primary">发布新服务</el-button>
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th width="8%">服务名称</th>
          <th width="8%">关注次数</th>
          <th width="8%">浏览次数</th>
          <th width="8%">发布时间</th>
          <th width="8%">服务状态</th>
          <th width="18%">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="saasList.length > 0">
          <tr v-for="(item, index) in saasList">
            <td v-if="item.status == '0'">
              <a target="_blank" :href="'saas.html#detail/'+ item.id">{{ item.name || '-' }}</a>
            </td>
            <td v-else>
              {{ item.name || '-' }}
            </td>
            <td>{{item.attentionCount}}</td>
            <td>{{item.viewCount || '-' }}</td>
            <td>{{new Date(item.createdTime).format('yyyy.MM.dd')}}</td>
            <td>{{item.statusDesc}}</td>
            <td>
              <!-- 通过 -->
              <template v-if="item.status == '0'">
                <a :href="'saas.html#update/' + item.id">修改</a>
                <a v-if="item.chargeType == '02'" href="javascript:;" @click="changePrice(item.id)">调价</a>
                <a href="javascript:;" @click="downSaas(item.id)">下架</a>
              </template>
              <!-- 审核中 -->
              <template v-if="item.status == '2'">
                <a :href="'saas.html#desc/' + item.id">查看</a>
              </template>
              <!-- 拒绝 -->
              <template v-else-if="item.status == '3'">
                <a href="javascript:;" class="reason" @click="showReason(item.comments)">查看原因</a>

                <a v-if="item.chargeType == '02'" href="javascript:;" @click="changePrice(item.id)">调价</a>

                <a :href="'saas.html#update/' + item.id">编辑</a>
                <a v-if="item.isOnline == 'N'" href="javascript:;" @click="deleteSaas(item.id)">删除</a>
                <a v-else href="javascript:;" @click="downSaas(item.id)">下架</a>
              </template>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="6">暂无数据</td>
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
      type="saas"
      v-if="loadChargeForm"
      :defaultIndex="chargeDefaultIndex"
      :visible="chargeFormDialogVisible"
      :serviceId="activeId"
      @submit="handleChargeFormSubmit"
      @toggle="toggleChargeFormVisible"></charge-form-dialog>
    <saas-update-dialog 
      v-if="loadSaasUpdate"
      :defaultIndex="saasUpdateDefaultIndex"
      :visible="saasUpdateDialogVisible"
      :serviceId="activeId"
      @submit="handleSaasUpdateSubmit"
      @toggle="toggleSaasUpdateVisible"></saas-update-dialog>
    <charge-table-dialog 
      type="saas" 
      v-if="loadChargeTable" 
      :id="activeId" 
      :visible="chargeTableDialogVisible"  
      @submit="handleChargeTableSubmit" 
      @toggle="toggleChargeTableVisible"
      @addChargeRule="invokeAddChargeForm"
      @updateChargeRule="invokeSaasUpdateCharge"></charge-table-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  require('common/utils/date')
  export default {
    data () {
      return {
        activeId: '',
        loadChargeForm: false,
        chargeDefaultIndex: '',
        chargeFormDialogVisible: false,
        loadSaasUpdate: false,
        saasUpdateDefaultIndex: '',
        saasUpdateDialogVisible: false,
        loadChargeTable: false,
        chargeTableDialogVisible: false,
        loading: false,
        saasList: {},
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
          this.querySaas()
        },
        deep: true
      }
    },
    created () {
      this.querySaas()
    },
    computed: {
      chargeRuleList () {
        return this.$store.getters.chargeRuleList
      }
    },
    methods: {
      toggleSaasUpdateVisible (arg) {
        this.saasUpdateDialogVisible = arg
      },
      toggleChargeFormVisible (arg) {
        this.chargeFormDialogVisible = arg
      },
      toggleChargeTableVisible (arg) {
        this.chargeTableDialogVisible = arg
      },
      querySaas () {
        this.loading = true
        this.apiList = []
        API.Saas.getMyPublishedSaas(this.params).then((res) => {
          this.loading = false
          this.saasList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      jumpPublish () {
        location.href = 'saas.html#create'
      },
      deleteSaas (id) {
        this.$confirm('确认删除这条SaaS服务吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Saas.deleteSaas({
            id: id
          }).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.querySaas()
          }).catch((res) => {
            this.$message({
              message: res.message || '删除失败',
              type: 'warning'
            });
          })
        })
      },
      downSaas (id) {
        this.$confirm('确认下架这条SaaS服务吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.Saas.offlineServiceSaas({
            id: id
          }).then((res) => {
            this.$message({
              message: '下架成功',
              type: 'success'
            });
            this.querySaas()
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
          arg.saasId = this.activeId
          this.$store.commit('addChargeRule', arg)
        }
        this.chargeDefaultIndex = ''
        // 套餐form提交完成后，继续显示调价table
        setTimeout(() => {
          this.changePrice(this.activeId)
        }, 500)
      },
      handleSaasUpdateSubmit (arg) {
        if(this.saasUpdateDefaultIndex !== '') {
          this.$store.commit('updateChargeRule', {
            chargeRuleIndex: this.saasUpdateDefaultIndex,
            chargeRule: arg
          })
        }
        this.saasUpdateDefaultIndex = ''
        // 套餐form提交完成后，继续显示调价table
        setTimeout(() => {
          this.changePrice(this.activeId)
        }, 500)
      },
      handleChargeTableSubmit () {
        this.querySaas()
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
      },
      invokeSaasUpdateCharge (index) {
        if(this.chargeRuleList[index].flag === 'C') {
          this.invokeUpdateChargeForm(index)
          return
        }
        this.chargeTableDialogVisible = false
        setTimeout(() => {
          this.loadSaasUpdate = true
          this.saasUpdateDefaultIndex = index
          this.saasUpdateDialogVisible = true
        }, 500)
      },
      showReason (comment) {
        this.$alert(comment, '拒绝原因', {
          confirmButtonText: '确定'})
      }
    },
    components: {
      'charge-form-dialog': () => import('components/chargeRule'),
      'charge-table-dialog': () => import('components/chargeTable'),
      'saas-update-dialog': () => import('./components/saasUpdate'),
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .saas-publish {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    .btn-add {
      margin-bottom: 20px;
    }
  }
</style>