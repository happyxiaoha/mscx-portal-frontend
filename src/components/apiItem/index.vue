<template>
  <div :class="[className, colClass]">
    <div class="api-top">
      <a :href="'api.html#/detail/' + (itemObj.apiServiceId || itemObj.sourceId)">
        <div class="api-icon">
          <img :src="itemObj.iconUrl || itemObj.logoUrl">
        </div>
      </a>
    </div>
    <div class="api-middle">
      <h4>
        <a :href="'api.html#/detail/' + (itemObj.apiServiceId || itemObj.sourceId)">{{itemObj.apiServiceName || itemObj.apiName}}</a>
      </h4>
      <div class="api-sub-text">智慧神州</div>
      <div class="api-count">
        <span class="api-apply">{{itemObj.applyCnt || 0}}</span>
        <span class="api-view">{{itemObj.viewCnt || 0}}</span>
      </div>
    </div>
    <div class="api-bottom">
      <img src="./images/api-charge-icon.png">
      <span v-if="itemObj.sourceId" class="api-pirce">{{itemObj.chargeType}}</span>
      <span v-else :class="[itemObj.chargeType !== '01' ? 'api-pirce' : '']">{{itemObj.price ? '¥' + itemObj.price + '/' + itemObj.chargeCount + '次' : itemObj.chargeTypeDesc}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["itemObj", "cols"],
    data: function () {
      return {
        className: 'api-item'
        
      }
    },
    computed: {
      colClass () {
        return 'cols' + this.cols
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
  .api-item {
    height: 305px;
    width: 18.4%;
    margin-right: 2%;
    border: 1px solid #eee;
    float: left;
    box-sizing: border-box;
    margin-bottom: 25px;
    .box-shadow();
    &:nth-child(5n) {
      margin-right: 0;
    }
    &.cols4 {
      width: 23.5%;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
    .api-top {
      height: 140px;
      background: #f1f2f7;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      .api-icon {
        padding: 25px 0px;
        text-align: center;
        img {
          height: 90px;
        }
      }
    }
    .api-middle {
      height: 110px;
      background: #fff;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      padding: 15px 0 15px 20px;
      h4 a {
        color: #000;
      }
      .api-sub-text {
        color: #aaa;
        padding: 5px 0;
      }
      .api-count {
        color: #aaa;
        margin-top: 15px;
        .api-apply {
          width: 50px;
          display: inline-block;
          padding-left: 20px;
          background: url(./images/api-apply-icon.png) left center no-repeat;
        }
        .api-view {
          width: 50px;
          display: inline-block;
          padding-left: 25px;
          background: url(./images/api-view-icon.png) left center no-repeat;
        }
      }
    }
    .api-bottom {
      background: #fff;
      height: 55px;
      box-sizing: border-box;
      padding: 0 15px;
      line-height: 55px;
      img {
        vertical-align: middle;
      }
      span {
        margin-left: 10px;
        color: @mainBackground;
      }
      .api-pirce {
        color: #ff8000;
      }
    }
  }
</style>
