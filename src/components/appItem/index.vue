<template>
  <div class="app-item">
    <div class="app-main">
      <div class="app-icon">
        <img :src="itemObj.imageUri">
      </div>
      <div class="app-content">
        <a :href="detailLink + 'detail/' + itemObj.id">
          <h1>{{itemObj.name}}</h1>
        </a>
        <span>服务商：{{itemObj.providerName}}</span>
        <span>服务方式：{{itemObj.serviceType}}</span>
        <span>服务渠道：{{itemObj.serviceChannel}}</span>
      </div>
      <div :class="[itemObj.chargeType === '02' ? 'app-price' : '' ,'app-charge']">
        {{itemObj.chargeTypeDesc}}
      </div>      
    </div>
    <div class="app-bottom">
      <el-tooltip effect="dark" :content="scope" placement="top">
        <span class="app-scope">
          {{scope}}
        </span>
      </el-tooltip>
      <p :class="isDescLong && toggleFlag ? 'ellipsis' : ''">{{itemObj.description}}</p>
      <span v-if="isDescLong && toggleFlag" class="app-desc-toggle" @click="toggleFlag = false">
        <i class="el-icon-arrow-down"></i>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["itemObj", 'type'],
    data: function () {
      return {
        toggleFlag: true
      }
    },
    computed: {
      scope () {
        return this.itemObj.scope.indexOf('，') > 0 || this.itemObj.scope.indexOf(',') > 0 ? '全国' : this.itemObj.scope
      },
      isDescLong () {
        return this.itemObj.description.length > 69
      },
      detailLink () {
        return this.type === 'saas' ? '/saas/' : '/services/'
      }
    },
    created: function () {
      
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  @import "../../assets/less/mixins.less";
  .app-item {
    min-height: 170px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-bottom: 20px;
    background: #fff;
    .box-shadow();
    .app-main {
      height: 115px;
      padding: 28px 0 28px 30px;
      box-sizing: border-box;
      overflow: hidden;
      .app-icon {
        float: left;
        img {
          width: 60px;
          height: 60px;
          border: 1px solid #ccc;
        }
      }
      .app-content {
        float: left;
        margin-left: 30px;
        h1 {
          color: @mainBackground;
          margin-bottom: 17px;
        }
        span {
          color: #666;
          margin-right: 60px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .app-charge {
        float: right;
        margin-right: 60px;
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
        min-width: 110px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background: #fff;
        text-align: center;
        box-sizing: border-box;
        margin-top: 4.5px;
        color: @mainBackground;
        font-size: 18px;
        font-weight: bold;
        &.app-price {
          color: @priceTextColor;
        }
      }
    }
    .app-bottom {
      min-height: 53px;
      background: #f9f9fa;
      padding: 15px 0 15px 30px;
      box-sizing: border-box;
      .app-scope {
        border: 1px solid #ccc;
        padding: 2px 0px;
        border-radius: 10px;
        background: #fff;
        box-sizing: border-box;
        width: 60px;
        text-align: center;
        float: left;
        .ellipsis();
      }
      p {
        margin-left: 30px;
        display: inline-block;
        width: 85%;
        &.ellipsis {
          .ellipsis();
        }
      }
      .app-desc-toggle {
        display: inline-block;
        vertical-align: 6px;
        cursor: pointer;
      }
    }
  }
</style>
