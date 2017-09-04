<template>
  <div class="api-env grid-l">
    <!-- <div v-html="apiEnvHtml"></div> -->
        <!--取最新一条帮助信息-->
  <div class="envList mt16 boxSizing">
    <!-- 文字内容 -->
    <div class="clearfix">
      <div class="top-font clearfix">
        <div class="left-font fl boxSizing mr72">
          <h2 class="ft24">API开发环境</h2>
          <p class="ft18 mt20">开发者通过平台提供的API开发环境可方便、快捷地实现数据API的开发。</p>
          <p class="ft14 mb20 core">开发者通过平台提供的API开发环境可方便、快捷地实现数据API的开发。API开发环境共分为两个部分：本地IDE工具以及云编译、云打包和云部署的SaaS平台。本地IDE工具提供了一套智能化的数据API生成工具，开发者仅需少量编码甚至零编码即可完成数据API的生成和封装。本地IDE工具同时支持团队的协同开发。生成的数据API在SaaS平台中经过云编译和云打包，可最终部署到平台中对外提供数据服务，供应用开发者调用。</p>
          
          
          <p class="ft14 mt25 core">详细的开发流程可参考:<a href="http://172.16.49.132:81/uploads/8/file/public/201701/20170121163350_tm8645e20t.pdf" target="_blank">
          <span class="ml5">API开发者手册</span>
          </a>
          </p>

        </div>
        <div class="fl tc mt48">
          <a href="contactUs.html">
            <img src="http://172.16.49.132:81/uploads/8/image/public/201701/20170121162344_cdr2nlesql.png" target="_blank">
            <p class="mt30 ft24">免费下载IDE</p>
          </a>
        </div>
      </div>
    </div>
  </div>

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
      // Axios.get('/static_html/datainfo/' + this.city.abbr + '_apiinfo/index.html?t=' + new Date().getTime()).then((res) => {
      //   this.apiEnvHtml = res
      // })
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
      // margin-right: 72px;
    }
    .boxSizing {
      box-sizing: border-box;
    }
    .core {
      color: #eee!important;
    }
  }
</style>