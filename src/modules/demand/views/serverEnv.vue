<template>
  <div class="server-env grid-l">
    <!-- <div v-html="serverEnvHtml"></div> -->
        <!--取最新一条帮助信息-->
  <div class="envList mt16 boxSizing">
    <!-- 文字内容 -->
    <div class="clearfix">
      <div class="top-font clearfix">
        <div class="left-font fl boxSizing mr72">
          <h2 class="ft24">服务开发环境</h2>
          <p class="ft14 mt34">服务控制台平台提供丰富的开发资源和模板，包括测试资源申请、生产资源申请、环境配置、测试功能、上线功能、数据库功能、状态监控，以及代码托管、持续集成功能。</p>
          
          <img class="mt20" src="http://172.16.49.132:81/uploads/8/image/public/201701/20170121162706_q632o3bkpk.png">
        </div>
        <div class="fl tc mt48">
          <a class="right-area" href="javascript:;" onclick="mscxPage.jumpDevelop();">
            <p class="ft24 mt48 corMain">点击进入</p>
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
        serverEnvHtml: ''
      }
    },
    created () {
      // Axios.get('/static_html/datainfo/' + this.city.abbr + '_serverdev/index.html?t=' + new Date().getTime()).then((res) => {
      //   this.serverEnvHtml = res
      // })
      window.mscxPage = {
        jumpDevelop () {
          Axios.get('/developer/portal.do').then((data) => {
            if(data.code == '500800') {
              location.href = '/login.html?service=' + encodeURIComponent(location.href);
            } else if(data.code == '500900') {
              location.href = '/userInfo.html#userAuth';
            } else {
              location.href = data.result;
            }
          })
        }
      }
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
  .server-env {
    margin-top: 20px;
    padding: 24px 16px;
    height: 428px;
    color: #fff;
    box-sizing: border-box;
    background: url(../images/bg_pioneer_server.png) no-repeat;
    .right-area {
      background: url(../images/pioneer_enter.png) center 40px no-repeat #dbf5f9;
      width: 185px;
      height: 240px;
      border-radius: 5px;
      display: table-cell;
      vertical-align: middle;
    }
    .top-font {
      position: relative;
      padding: 0px;
      margin: 0px;
      background: none;
    }
    .left-font {
      width: 778px;
      height: 405px;
      padding: 20px 60px;
      h2 {
        color: #fff;
      }
      p {
        line-height: 26px;
        text-indent: 2em;
        width: 615px;
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
    .mt34 {
      margin-top: 34px!important;
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