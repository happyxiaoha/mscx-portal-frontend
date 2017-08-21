<template>
  <div class="shopcart-wrapper">
    <p class="car-title">
      <span>
        <el-checkbox v-model="checkAll">全选</el-checkbox>
      </span>
      <span class="resources">资源名称</span>
      <span class="price">申请价格</span>
      <span class="count">申请套餐数</span>
      <span class="resourcestype">资源类型</span>
      <span class="amount">金额</span>
    </p>
    <ul class="shop-ul">
      <li v-for="item in shopcartList">
        <template v-if="!item.chargeRuleValid || !item.resourceValid">
          <p>
            <span>{{ item.createdTime ? new Date(item.createdTime).format('yyyy-MM-dd HH:mm:ss') : '-' }}</span>
            <span class="delete-item" @click="deleteItem(item)"></span>
          </p>
          <div class="order-list">
            <span class="checkbox-wrapper"></span>
            
            <a v-if="item.resourceType == '01' || item.resourceType == '03'" class="resources" href="javascript:;">
              <img :src="item.resourceUrl">
              <p>{{ item.resourceName }}</p>
            </a>
            <a v-else-if="item.resourceType == '03'" class="resources" href="javascript:;">
              <img :src="item.resourceUrl">
              <p>{{ item.resourceName }}</p>
            </a>
            <a v-else class="resources" style="width: 250px;text-align: center;display:inline-block;" href="javascript:;">
              <p>{{ item.resourceName }}</p>
            </a>
            <span class="price item-col">{{ item.price }}元</span>
            <span class="count item-col">
              <img src="../../images/downed.png">
            </span>
            <span class="resourcestype item-col">
              {{ item.resourceDetailType || '-' }}</span>
            <span class="amount item-col amount-dis">
              {{ item.totalPrice }}元</span>
          </div>
        </template>
        <template v-else>
          <p>
            <span>
              {{ item.createdTime ? new Date(item.createdTime).format('yyyy-MM-dd HH:mm:ss') : '-' }}</span>
            <span class="delete-item" @click="deleteItem(item)"></span>
          </p>
          <div class="order-list">
            <span class="checkbox-wrapper">
              <el-checkbox v-model="item.checked"></el-checkbox>
              <!-- <input class="is-select-shop" type="checkbox" <%if(scitem.applyTimes > 0 || scitem.resourceType == '02'){%>checked="true"<%}%>> -->
            </span>
            <a v-if="item.resourceType == '01'" class="resources" :href="'api.html#detail/' + item.resourceId">
              <img :src="item.resourceUrl">
              <p>{{ item.resourceName }}</p>
            </a>
            <a v-else-if="item.resourceType == '03'" class="resources" :href="'services.html#detail/' + item.resourceId">
              <img :src="item.resourceUrl">
              <p>{{ item.resourceName }}</p>
            </a>
            <a v-else class="resources" style="width: 250px;text-align: center;display:inline-block;">
              <p>{{ item.resourceName }}</p>
            </a>
            <span class="price item-col">{{item.price}}元</span>

            <span v-if="item.resourceType == '01' || item.resourceType == '03'" class="count">
              <el-input-number size="small" v-model="item.applyTimes" :min="1" :max="100" @change="handleTimesChange(item)"></el-input-number>
            </span>
            <span v-else class="count">
              <el-input-number size="small" :disabled="true" v-model="item.applyTimes" :min="1" :max="100"></el-input-number>
            </span>
            <span class="resourcestype item-col">
              {{item.resourceDetailType || (item.resourceType == '02' && '数据报告') || (item.resourceType == '03' && '微应用') || (item.resourceType == '04' && 'SaaS') }}</span>
            
            <span class="amount item-col">{{ item.totalPrice }}元</span>
          </div>
        </template>
      </li>
    </ul>
    <div class="page-wrapper" v-if="pageInfo.totalSize > 5">
      <el-pagination
        layout="prev, pager, next"
        @current-change="jumpPage"
        :current-page.sync="pageInfo.currentPage"
        :page-size="5"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
    <div class="car-title bottom">
      <span>
        <label>
          <el-checkbox v-model="checkAll">全选</el-checkbox>
        </label>
      </span>
      <div class="total-wrapper">
        <span class="total-number-wrapper">
          已选择<b class="total-number">{{selectedCount}}</b>个资源
        </span>
        <span class="total-price-wrapper">总价
          <b class="total-price">￥{{totalAmount || '0.00'}}</b>
        </span>
        <el-button type="primary" :disabled="selectedCount < 1" class="btn-pay" @click="goPay">去结算</el-button>
        <!-- <button class="pay toShopPay"><a href="javascript:;" class="corff">去结算</a></button> -->
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    data () {
      return {
        checkAll: false,
        shopcartList: [],
        pageInfo: {
          totalSize: 0
        },
        params: {
          page: 1,
          pageSize: 5
        }
      }
    },
    computed: {
      selectedCount () {
        return this.checkedList.length
      },
      totalAmount () {
        let amount = 0
        _.each(this.checkedList, (item) => {
          amount += item.totalPrice
        })
        return amount
      },
      checkedList () {
        return _.filter(this.shopcartList, (item) => {
          return item.checked
        })
      }
    },
    watch: {
      checkAll () {
        if(this.checkAll) {
          _.each(this.shopcartList, (item) => {
            item.checked = true
          })
        }else {
          _.each(this.shopcartList, (item) => {
            item.checked = false
          })
        }
      }
    },
    created () {
      this.getShopcartList()
    },
    methods: {
      getShopcartList () {
        API.UC.getShopcartList(this.params).then((res) => {
          _.each(res.result.list, (item) => {
            if(item.applyTimes > 0 || item.resourceType == '02') {
              item.checked = true
            }else {
              item.checked = false
            }
          })
          this.shopcartList = res.result.list
          this.pageInfo = res.result.page
          
        })
      },
      jumpPage (page) {
        this.params.page = page
        this.getShopcartList()
      },
      handleTimesChange (item) {
        setTimeout(() => {
          API.UC.modifyShopcartItem({
            cartItemId: item.id,
            applyTimes: item.applyTimes
          })
          item.totalPrice = item.applyTimes * item.price
        })
      },
      deleteItem (item) {
        this.$confirm('确定要删除该条购物车记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.UC.deleteShopcartItem({
            cartItemId: item.id
          }).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getShopcartList()
          }).catch((res) => {
            this.$message({
              message: res.message || '删除失败',
              type: 'warning'
            });
          })
        })
      },
      goPay () {
        let cartIds = _.map(this.checkedList, (item) => {
          return item.id
        })
        API.Common.placeShopcartOrder({
          cartIds: cartIds.join(',')
        }).then((res) => {
          if(this.totalAmount === 0) {
            this.$message({
              message: '购买成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push({path: 'orderList'})
            }, 2000)
          }else {
            let param = {
              orderNum: res.result
            }
            let base = new Base64;
            window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
            location.href = 'pay.html';
          }
        }).catch((res) => {
          this.$message({
            message: res.message || '结算失败',
            type: 'warning'
          });
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .shopcart-wrapper {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    overflow: hidden;
    .resources {
      width: 250px
    }
    .price, .count, .resourcestype, .amount {
      width: 102px;
    }
    .car-title {
      width: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      height: 45px;
      line-height: 43px;
      text-align: center;
      font-size: 14px;
      overflow: hidden;
      &.bottom {
        border: 1px solid #dcdcdc;
        margin-top: 20px;
        .total-wrapper {
          float: right;
        }
        .total-number-wrapper {
          margin-right: 10px;
          .total-number {
            font-size: 18px;
            color: @mainBackground 
          }
        }
        .total-price-wrapper {
          margin-right: 10px;
          .total-price {
            font-size: 18px;
            color: @mainBackground 
          }
        }
        .btn-pay {
          height: 45px;
          border-top: 0;
          border-bottom: 0;
          border-right: 0;
        }
      }
      span {
        display: block;
        float: left;
        line-height: 45px;
        box-sizing: border-box;
      }
      input[type=checkbox] {
        margin: 2px 3px 3px 4px;
        padding: 0;
        width: 13px;
        height: 13px;
      }
    }
    .shop-ul {
      li {
        border: 1px solid #e1e1e1;
        margin-bottom: 20px;
        &>p {
          padding: 10px 0 10px 20px;
          background: #efefef;
        }
        .order-list {
          height: 112px;
          display: table-cell;
          vertical-align: middle;
          overflow: hidden;
          .checkbox-wrapper {
            margin-left: 10px;
          }
          a {
            cursor: pointer;
            p {
              display: inline-block;
              width: 145px;
              color: #00aff6;
            }
          }
          .item-col {
            display: inline-block;
            text-align: center;
            &.operation {
              text-align: center;
              background: #e9f5fc;
            }
            a {
              width: 100%;
              color: #00aff6;
            }
          }
        }
        .delete-item {
          float: right;
          display: block;
          height: 22px;
          width: 22px;
          background: url("../../images/del-shopcart.png") no-repeat;
          cursor: pointer;
          margin-right: 3px;
        }
      }
      img {
        height: 80px;
        width: 80px;
        border: 1px solid #dcdcdc;
        margin: 15px 10px;
        vertical-align: middle;
      }
    }
  }
</style>