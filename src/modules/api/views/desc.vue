<template>
  <div class="api-desc-content grid-l">
    <h1>API详情</h1>
    <el-form label-width="150px">
      <el-form-item label="服务范围：">
        {{detail.scope}}
      </el-form-item>
      <el-form-item label="服务名称：">
        {{detail.cname}}
      </el-form-item>
      <el-form-item label="服务标识：">
        {{detail.name}}
      </el-form-item>
      <el-form-item label="服务简介：">
        {{detail.description}}
      </el-form-item>
      <el-form-item label="服务图标：">
        <img :src="detail.imageUri">
      </el-form-item>
      <el-form-item label="服务分类：">
        {{categoryName}}
      </el-form-item>
      <el-form-item label="标签：">
        {{detail.tagsName}}
      </el-form-item>
      <el-form-item label="服务返回码：">
        {{detail.rtnCode}}
      </el-form-item>
      <el-form-item label="服务对象：">
        {{serviceObjectName}}
      </el-form-item>
      <el-form-item label="是否收费：">
        {{chargeTypeName}}
      </el-form-item>
      <div class="table-wrapper" v-show="detail.chargeType == '02'">
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
            <template v-if="chargeRule.length > 0">
              <tr v-for="(item, index) in chargeRule">
                <td>{{item.name}}</td>
                <td>{{item.price + '元/' + item.chargeCount + (item.chargeType === '05' ? '次' : '月')}}</td>
                <td>{{item.countLimit === '-1' ? '不限制' : '限制一次'}}</td>
                <td>{{item.monthLimit === 0 ? '不限制' : (item.monthLimit + (item.chargeType === '05' ? '次' : '个月'))}}</td>
                <td>{{item.effectDate && new Date(item.effectDate).format('yyyy-MM-dd')}}</td>
                <td>{{item.expireDate}}</td>
                <td>
                  -
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="7">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-wrapper">
        <table class="table">
          <tr>
            <th>API名称</th>
            <th>API标识</th>
            <th>API地址</th>
            <th>是否鉴权</th>
            <th>操作</th>
          </tr>
          <tbody id="apiTable">
            <template v-if="detail.apiListJson.length > 0">
              <tr v-for="(item, index) in detail.apiListJson" v-show="item.flag !== 'D'">
                <td>{{item.cname}}</td>
                <td>{{item.name}}</td>
                <td>{{item.uri}}</td>
                <td>{{item.isAuth === '0' ? '是' : '否'}}</td>
                <td>
                  -
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="5">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-form>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  require('common/utils/date')
  const types = {
    '01': '免费',
    '02': '收费',
    '04': '按实际订单支付'
  }
  export default {
    data () {
      return {
        detail: {
          apiListJson: []
        },
        chargeRule: [],
        id: '',
        serviceObject: [],
        categoryList: []
      }
    },
    computed: {
      categoryName () {
        let category = _.find(this.categoryList, (item) => {
          return item.categoryId == this.detail.categoryId
        }) || {}
        return category.categoryName || ''
      },
      serviceObjectName() {
        let object = _.find(this.serviceObject, (item) => {
          return item.dictCode == this.detail.serviceObject
        }) || {}
        return object.dictName || ''
      },
      chargeTypeName () {
        return types[this.detail.chargeType]
      }
    },
    created () {
      this.id = this.$route.params.id
      API.Api.getApiDetailUpdate({
        apiServiceId: this.id
      }).then((res) => {
        this.detail = res.result
      })
      API.Api.getMyChargeRuleByServiceId({
        apiServiceId: this.id
      }).then((res) => {
        this.chargeRule = res.result
      })
      API.Dict.getServiceObject().then((res) => {
        this.serviceObject = res.result
      })
      API.Dict.getApiCategory().then((res) => {
        this.categoryList = res.result
      })
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .api-desc-content {
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
  }
</style>