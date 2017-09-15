<template>
  <div class="selected-wrapper" v-if="selectedApp.length > 0">
    <div class="top">
      <img src="../images/selected-saas-title.png">
      <a href="/saas/">更多</a>
    </div>
    <div class="selected" v-loading="loading">
      <div class="selected-side">
        <img :src="marketTheme && marketTheme.imageUrl">
        <button @click="jump">立即进入</button>
      </div>
      <div class="selected-content">
        <ul class="selected-ul">
          <li v-for="(item, index) in selectedApp" v-if="index < 4">
            <div class="item-left">
              <div class="img-wrapper">
                <img :src="item.imageUri">
              </div>
            </div>
            <div class="item-right">
              <a :href="'/saas/detail/' + item.id" class="title">{{item.name}}</a>
              <p :class="[item.description.length > 73 ? 'ellipsis' : '', 'sub-title']">{{item.description}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'common/api/index'
  export default {
    data () {
      return {
        isApiActive: true,
        selectedApp: [],
        loading: true,
        chargeIcon: '',
        marketTheme: {}
      }
    },
    created () {
      API.Saas.getSelectedSaas().then((res) => {
        this.selectedApp = res.result
        this.loading = false
      })
      API.Saas.getMarketingTheme().then((res) => {
        this.marketTheme = res.result
      })
    },
    methods: {
      jump () {
        if(this.marketTheme.showRuleType === '2') {
          location.href = this.marketTheme.browseUrl
        }else {
          location.href = '/saas' + 
          (this.marketTheme.categoryId ? '/category-' + this.marketTheme.categoryId : '') + 
          (this.marketTheme.tags ? '/tag-' + this.marketTheme.tags.split(',')[0] : '')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .selected-wrapper {
    margin-top: 30px;
    .top a {
      float: right;
      margin-right: 30px;
      color: #666;
    }
    .selected {
      margin-top: 20px;
      height: 430px;
      .box-shadow();
      background: #fff;
      padding: 20px 0;
      box-sizing: border-box;
      .selected-side {
        width: 20%;
        display: inline-block;
        vertical-align: top;
        padding-left: 20px;
        position: relative;
        img {
          width: 200px;
          height: 380px;
        }
        button {
          position: absolute;
          top: 300px;
          left: 80px;
          background: #ff5050;
          border: 0;
          padding: 7px 15px;
          color: #fff;
          border-radius: 10px;
          outline: 0;
          cursor: pointer;
        }
      }
      .selected-content {
        width: 77%;
        display: inline-block;
        .selected-ul > li {
          height: 180px;
          width: 48%;
          border: 1px solid #ccc;
          float: left;
          margin-right: 17px;
          margin-bottom: 20px;
          box-sizing: border-box;
          padding: 0 10px;
          &:nth-child(2n) {
            margin-right: 0;
          }
          .item-left {
            width: 30%;
            display: inline-block;
            height: 100%;
            overflow: hidden;
            .img-wrapper {
              display: table-cell;
              height: 178px;
              vertical-align: middle;
              width: 30%;
            }
          }
          .item-right {
            width: 68%;
            display: inline-block;
            vertical-align: top;
            height: 178px;
            padding: 20px;
            box-sizing: border-box;
            position: relative;
            .title {
              font-size: 18px;
              font-weight: 600;
            }
            .sub-title {
              margin-top: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 95px;
              color: #666;
              &.ellipsis:after {
                content: '...';
                position: absolute;
                top: 130px;
                right: 15px;
              }
            }
          }
        }
      }
    }
  }
  
</style>