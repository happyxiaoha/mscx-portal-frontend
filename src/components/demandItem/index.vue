<template>
  <div class="app-item">
    <div class="app-main">
      <div class="app-content">
        <a :href="detailLink">
          <h1>{{itemObj.name}}</h1>
        </a>
        <p>{{itemObj.name}}</p>
        <div v-if="type === 'api'" class="app-content-right">{{itemObj.netType}}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{{itemObj.department}}</div>
        <div class="app-view-count">
          <div class="app-view-wrapper">
            <span class="app-view-text app-money">{{itemObj.money}}</span>
            <span>任务金额</span>
          </div>
          <div class="app-view-wrapper">
            <span class="app-view-text">{{itemObj.pageviewAmount}}</span>
            <span>已浏览</span>
          </div>
        </div>
      </div>
    </div>
    <div class="app-bottom">
      <span class="app-person">
        {{itemObj.reqUser}}
      </span>
      <span>发布于<span class="app-time">{{new Date(itemObj.publishTime).toISOString().slice(0,10)}}</span></span>
      <span>截止于<span class="app-time">{{new Date(itemObj.endTime).toISOString().slice(0,10)}}</span></span>
      <div class="app-status">
        {{itemObj.statusCode || itemObj.status == 2 ? '新任务' : '已结束'}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["itemObj", "type"],
    data: function () {
      return {
      }
    },
    computed: {
      detailLink () {
        let type = this.type
        return '#/' + type + '/detail/' + this.itemObj.id
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
      padding: 28px 28px 28px 50px;
      box-sizing: border-box;
      overflow: hidden;
      .app-content {
        position: relative;
        h1 {
          color: @mainBackground;
          margin-bottom: 17px;
        }
        .app-content-right {
          position: absolute;
          top: 5px;
          right: 15%;
          color: #999;
        }
        .app-view-count {
          position: absolute;
          right: 0;
          color: #999;
          top: 5px;
          line-height: 19px;
          .app-view-wrapper {
            text-align: right;
            margin-bottom: 5px;
          }
          .app-view-text {
            font-size: 20px;
            margin-right: 15px;
            color: @mainBackground;
            vertical-align: middle;
            font-style: italic;
            &.app-money {
              color: @priceTextColor;
              
            }
          }
        }
      }
    }
    .app-bottom {
      min-height: 53px;
      padding: 10px 28px 15px 50px;
      box-sizing: border-box;
      color: #999;
      .app-person {
        padding-left: 25px;
        background: url(./images/demand-person-icon.png) left center no-repeat;
      }
      & > span {
        margin-right: 100px;
      }
      .app-time {
        color: @mainBackground;
        margin-left: 10px;
      }
      .app-status {
        background: #e3e4e8 url(./images/demand-clock-icon.png) 10px center no-repeat;
        float: right;
        width: 115px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        border-radius: 15px;
        font-style: italic;
        padding-left: 35px;
        font-weight: 600;
        box-sizing: border-box;
      }
    }
  }
</style>
