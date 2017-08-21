<template>
  <div class="order-list" v-loading="loading">
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th>订单号</th>
          <th>资源名称</th>
          <th>资源类型</th>
          <th>申请时间</th>
          <th>申请单价</th>
          <th>申请次数</th>
          <th>总金额</th>
          <th>订单状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="orderList.length > 0">
          <template v-for="(orderItem, orderIndex) in orderList">
            <tr v-for="(item, index) in orderItem.sourceDetail">
              <td v-if="index === 0 && orderItem.sourceDetail.length >= 1" :rowspan="orderItem.sourceDetail.length">
                {{ orderItem.orderNum }}
              </td>
              <template v-if="orderItem.order_classify == '2'">
                <td>{{ item.resourceName }}</td>
                <td>充值</td>
              </template>
              <template v-else-if="item.resourceType == '02'">
                <td>
                  <a :href="'sources.html#detail/' + item.resourceId">{{ item.resourceName }}</a></td>
                <td>数据</td>
              </template>
              <template v-else-if="item.resourceType == '03'">
                <td>
                  <a :href="'services.html#detail/' + item.resourceId">
                    {{ item.resourceName }}
                  </a>
                </td>
                <td>微应用</td>
              </template>
              <template v-else-if="item.resourceType == '04'">
                <td>
                  <a :href="'saas.html#detail/' + item.resourceId">
                    {{ item.resourceName }}
                  </a>
                </td>
                <td>SaaS服务</td>
              </template>
              <template v-else>
                <td>
                  <a :href="'api.html#detail/' + item.resourceId">
                    {{ item.resourceName }}
                  </a>
                </td>
                <td>API</td>
              </template>
              <td>
                {{ orderItem.orderTime ? orderItem.orderTime : '-' }}
              </td>
              <td>{{ item.itemCash }}</td>
              <template v-if="item.resourceType == '02'">
                <td>-</td>
              </template>
              <template v-else>
                <td>
                  {{ item.defaulTime == -1 ? '无次数限制' : parseInt(item.defaulTime || 0)}}
                </td>
              </template>
              <td>{{ item.itemCashTotal }}</td>
              <td>{{ orderItem.orderStatus }}</td>
              <td>
                <a v-if="orderItem.orderStatus == '未支付'" href="javascript:;" @click="payOrder(orderItem.orderNum)">支付</a>
              </td>
            </tr>
          </template>
        </template>
        <tr v-else>
          <td colspan="9">暂无数据</td>
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
  </div>
</template>
<script>
  import API from 'common/api'
  require('common/utils/date')
  export default {
    data () {
      return {        
        loading: false,
        orderList: {},
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
          this.queryOrderList()
        },
        deep: true
      }
    },
    created () {
      this.queryOrderList()
    },
    methods: {
      queryOrderList () {
        this.loading = true
        this.orderList = []
        API.Order.getOrderList(this.params).then((res) => {
          this.loading = false
          this.orderList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      payOrder (orderNum) {
        var param = {
            orderNum: orderNum
        };
        var base = new Base64;
        window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
        location.href = 'pay.html';
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .order-list {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
  }
</style>