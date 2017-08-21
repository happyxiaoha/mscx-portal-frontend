<template>
  <div class="demand-desc-content grid-l">
    <h1>服务开发需求详情</h1>
    <el-form label-width="180px">
      <el-form-item label="任务名称：">
        {{detail.name}}
      </el-form-item>
      <el-form-item label="任务描述：">
        {{detail.description}}
      </el-form-item>
      <el-form-item label="任务要求：">
        {{detail.required}}
      </el-form-item>
      <el-form-item label="任务金额：">
        {{detail.money}}
      </el-form-item>
      <el-form-item label="截止日期：">
        {{detail && new Date(detail.endTime).format('yyyy-MM-dd')}}
      </el-form-item>
      <el-form-item label="主联系人信息：">
        {{detail.contactUsername}}
      </el-form-item>
      <el-form-item label="主联系人电话：">
        {{detail.contactPhone}}
      </el-form-item>
      <el-form-item label="备用联系人：">
        {{detail.spareContactname}}
      </el-form-item>
      <el-form-item label="备用联系人电话：">
        {{detail.spareContactphone}}
      </el-form-item>
      <el-form-item label="邮箱：">
        {{detail.contactEmail}}
      </el-form-item>
      <el-form-item label="地址：">
        {{detail.contactAddress}}
      </el-form-item>
      <el-form-item label="分类：">
        {{detail.categoryName}}
      </el-form-item>
      <el-form-item label="是否需要平台撮合交易：">
        {{detail.matchmakeTradeName}}
      </el-form-item>
      <el-form-item label="需求用户：">
        {{detail.reqUser}}
      </el-form-item>
      <el-form-item label="邮箱：">
        {{detail.contactEmail}}
      </el-form-item>
      <el-form-item label="地址：">
        {{detail.contactAddress}}
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    data () {
      return {
        detail: {
        },
        id: ''
      }
    },
    computed: {
    },
    created () {
      this.id = this.$route.params.id
      API.Demand.getModifyServiceDetail({
        id: this.id
      }).then((res) => {
        this.detail = res.result
      })
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .demand-desc-content {
    background: #fff;
    margin-top: 20px;
    padding: 24px 36px;
    box-sizing: border-box;
    .box-shadow();
    h1 {
      margin-bottom: 30px;
    }
    .table {
      margin-bottom: 22px;
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
</style>