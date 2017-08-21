<template>
  <div class="api-env grid-l">
    <div v-html="apiEnvHtml"></div>
  </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    data () {
      return {
        apiEnvHtml: ''
      }
    },
    created () {
      Axios.get('/static_html/datainfo/' + this.city.abbr + '_apiinfo/index.html?t=' + new Date().getTime()).then((res) => {
        this.apiEnvHtml = res
      })
    },
    computed: {
      city () {
        return this.$store.getters.city
      }
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .api-env {
    margin-top: 20px;
    padding: 24px 16px;
    height: 428px;
    color: #fff;
    box-sizing: border-box;
    background: url(../images/bg_pioneer_api.png) no-repeat;
    a {
      color: #fff;
    }
    .top-font {
      position: relative;
      padding: 0px;
      margin: 0px;
      background: none;
    }
    .left-font {
      width: 800px;
      height: 405px;
      padding: 20px 60px;
      h2 {
        color: #fff;
      }
      p {
        padding: 10px 0;
        line-height: 30px;
        &:first-child{
          line-height: 24px;
          text-indent: 2em;
        }
      }
      .l-img{
        margin-right: 15px
      }
    }
    .fl {
      float: left;
    }
    .tc {
      text-align: center
    }
    .ft18 {
      font-size: 18px;
    }
    .ft24 {
      font-size: 24px;
    }
    .mt20 {
      margin-top: 20px!important;
    }
    .mt48 {
      margin-top: 48px!important; 
    }
    .mt16 {
      margin-top: 16px!important;
    }
    .mr72 {
      margin-right: 72px;
    }
    .boxSizing {
      box-sizing: border-box;
    }
    .core {
      color: #eee!important;
    }
  }
</style>