<template>
  <div class="demand-desc-content grid-l">
    <h1>API需求详情</h1>
    <el-form label-width="180px">
      <el-form-item label="需求说明：">
        {{detail.name}}
      </el-form-item>
      <el-form-item label="系统名称：">
        {{detail.sysName}}
      </el-form-item>
      <el-form-item label="系统类型：">
        {{detail.sysType}}
      </el-form-item>
      <el-form-item label="系统描述：">
        {{detail.sysDescription}}
      </el-form-item>
      <el-form-item label="归属单位：">
        {{detail.department}}
      </el-form-item>
      <el-form-item label="所有权：">
        {{detail.ownership}}
      </el-form-item>
      <el-form-item label="访问网址：">
        {{detail.site}}
      </el-form-item>
      <el-form-item label="网络性质：">
        {{detail.netType == 'inner'? '内网系统':'公网系统'}}
      </el-form-item>
      <el-form-item label="开发语言：">
        {{detail.developLanguage}}
      </el-form-item>
      <el-form-item label="接口个数：">
        {{detail.interfaceNum}}
      </el-form-item>
      <el-form-item label="截止日期：">
        {{detail && new Date(detail.endTime).format('yyyy-MM-dd')}}
      </el-form-item>
      <el-form-item label="需求用户：">
        {{detail.reqUser}}
      </el-form-item>
      <el-form-item label="联系人：">
        {{detail.contactUsername}}
      </el-form-item>
      <el-form-item label="联系人电话：">
        {{detail.contactPhone}}
      </el-form-item>
      <el-form-item label="备用联系人：">
        {{detail.spareContactUsername}}
      </el-form-item>
      <el-form-item label="备用联系人电话：">
        {{detail.spareContactPhone}}
      </el-form-item>
        <el-form-item label="是否需要平台撮合交易：">
        {{detail.matchmakeTrade}}
      </el-form-item>
      <el-form-item label="分类：">
        {{detail.categoryName}}
      </el-form-item>
      <el-form-item label="预期报价：">
        {{detail.preOffer}}
      </el-form-item>
      <el-form-item label="附件：">
        <a :href="detail.fileUrl"></a>{{detail.fileName}}
      </el-form-item>
      <el-form-item label="说明：">
        {{detail.description}}
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
      API.Demand.getModifyApiDetail({
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