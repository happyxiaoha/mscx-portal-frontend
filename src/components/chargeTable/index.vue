<template>
  <el-dialog title="调价" custom-class="charge-table-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-button type="primary" @click="addChargeRule">增加</el-button>
    <table class="table">
      <thead>
        <tr>
          <th>套餐名称</th>
          <th>套餐价格</th>
          <th>购买限制</th>
          <th>使用限制</th>
          <th>生效日期</th>
          <th>失效日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="chargeRuleList.length > 0">
          <tr v-for="(item, index) in chargeRuleList" v-show="item.flag !== 'D'">
            <td>{{item.name}}</td>
            <td>{{item.price + '元/' + item.chargeCount + (item.chargeType === '05' ? '次' : limitTimeText)}}</td>
            <td>{{item.countLimit === '-1' ? '不限制' : '限制一次'}}</td>
            <td>{{(item.monthLimit || item.invokeLimit) === 0 ? '不限制' : ((item.monthLimit || item.invokeLimit) + (item.chargeType === '04' ? '次' : limitTimeText))}}</td>
            <td>{{item.effectDate && new Date(item.effectDate).format('yyyy-MM-dd')}}</td>
            <td>{{(item.expireDate || item.expiryDate) && new Date(item.expireDate || item.expiryDate).format('yyyy-MM-dd')}}</td>
            <td>
              <a href="javascript:;" @click="updateChargeRule(index)">修改</a>
              <a v-if="!isTypeSaas || item.flag === 'C'" href="javascript:;" @click="removeChargeRule(index)">删除</a>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="7">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    props: ['visible', 'type', 'id'],
    data () {
      return {
        dialogVisible: this.visible,
      }
    },
    computed: {
      chargeRuleList () {
        return this.$store.getters.chargeRuleList
      },
      isTypeAPI () {
        return this.type === 'api'
      },
      isTypeSaas () {
        return this.type === 'saas'
      },
      isTypeService () {
        return this.type === 'service'
      },
      limitTimeText () {
        return this.isTypeAPI ? '月' : '天'
      }
    },
    created () {
      if(this.id) {
        this.getChargeRule()
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
      updateChargeRule (index) {
        this.$emit('updateChargeRule', index)
      },
      addChargeRule () {
        this.$emit('addChargeRule')
      },
      removeChargeRule (index) {
        // 修改模式下
        this.$confirm('确认删除这条套餐吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if(this.id && this.chargeRuleList[index].flag !== 'C') {
            this.$store.commit('flagChargeRuleDetele', index)
          }else {
            this.$store.commit('removeChargeRule', index)
          }
          console.log(this.chargeRuleList)
        })
      },
      submit () {
        this.$confirm('将重新审核，请确认！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          let requestApi = this.getModifyChargeApi()
          requestApi({
            params: this.chargeRuleList
          }).then(() => {
            this.$message({
              message: '保存成功,已提交审核!',
              type: 'success'
            });
            this.$emit('submit')
            this.closeDialog()
          })
        })
      },
      getChargeRule() {
        if(this.isTypeAPI) {
          API.Api.getMyChargeRuleByServiceId({apiServiceId: this.id}).then((res) => {
            this.$store.commit('setChargeRuleList', res.result || [])
          })
        }else if(this.isTypeSaas) {
          API.Saas.getChargeRuleDetail({saasId: this.id}).then((res) => {
            this.$store.commit('setChargeRuleList', res.result || [])
          })
        }else if(this.isTypeService) {
          API.App.getChargeRuleDetail({appId: this.id}).then((res) => {
            if(res.result.length > 0) {
              _.each(res.result, (item) => {
                item.flag = ''
              })
            }
            this.$store.commit('setChargeRuleList', res.result || [])
          })
        }
      },
      getModifyChargeApi () {
        if(this.isTypeAPI) {
          return API.Api.modifyChargeRule
        }else if(this.isTypeSaas) {
          return API.Saas.modifyChargeRule
        }else if(this.isTypeService) {
          return API.App.modifyChargeRule
        }
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      id () {
        if(this.id) {
          this.getChargeRule()
        }
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