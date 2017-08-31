<template>
  <div class="layout">
    <c-header></c-header>
    <div class="content grid-l">
      <div class="left-help-side">
        <a href="#" class="helpInfo">帮助中心</a>
        <ul>
          <li :class="[currentName === 'guidanceHelp' ? 'active' : '']"><a href="#guidance">新手指导</a></li>
          <li :class="[currentName === 'apiHelp' ? 'active' : '']"><a href="#api">API使用</a></li>
          <li :class="[currentName === 'serviceHelp' ? 'active' : '']"><a href="#service">微应用使用</a></li>
          <li :class="[currentName === 'apiQuestion' ? 'active' : '']"><a href="#question">常见问题</a></li>
        </ul>
      </div>
      <div class="right-help-side help-area">
        <router-view></router-view>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  export default {
    data: function() {
      return {
        activeTabIndex: -1
      }
    },
    
    mounted () {

    },
    watch: {
      $route (to, from) {
        this.currentName = to.name;
      }
    },
    created () {
      this.currentName = this.$route.name
    },
    components: {
      'c-header': header,
      'c-footer': footer
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .layout {
    background: #f7f8fc;
    .content {
      overflow: hidden;
      margin-top: 20px;
    }
    .grid-l {
      position: relative;
    }
      
  }
  .left-help-side {    text-align: center;float: left;  width: 180px;    border: 1px solid #ececec;}
  .left-help-side a.helpInfo {height: 40px; line-height: 40px;color: #bbb;background: #f8f8f8;display: block;}
  .left-help-side ul li {line-height: 14px;padding: 18px 0;background: #fcfcfc;border-top: 1px solid #ececec;}
  .left-help-side ul li a { display: block;height: 14px;line-height: 14px;color: #666; }
  .left-help-side ul li.active a {color: #00aeff;font-weight: bold;border-right: 4px solid #00aeff;}
  .right-help-side {    box-sizing: border-box;width: 980px;float: right;background: #FFF;border: 1px solid #ececec;padding: 20px 0 0 30px;}
  .right-help-side .title {height: 34px;line-height: 34px;font-weight: bold;}
  .title i{margin: 0 5px;font-weight: normal;}
  .title span {font-weight: normal;}
  .right-help-side .main-native-area {padding: 12px 0 30px;border-bottom: 1px dashed #ddd;}
  .right-help-side .main-native-area a {line-height: 28px;color: #00aeff;}
  .api-help-con li {padding: 25px 0;}
  .api-help-con li h3 {margin-bottom: 20px; line-height: 30px;color: #333;font-size: 20px;padding-left: 13px; background: url(../images/dianicon.png) 0 12px no-repeat;  font-weight: 400;}
  .api-help-con li div p {margin: 20px 0;line-height: 25px;}
  .api-help-con li div code {line-height: 25px;display: block;}
  .api-help-con li div img {}
  .api-help-con li table code {white-space: pre-line;word-break: break-all;overflow: hidden;line-height: 15px;display: block;}
  table .bg-1 {background: #F5F5F5;}
  table p {margin: 0 !important;}
  .table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th {
    padding: 5px
  }

  .table-bordered,.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th {
      border: 1px solid #ddd
  }

  .table-bordered>thead>tr>td,.table-bordered>thead>tr>th {
      border-bottom-width: 2px
  }
  @media screen and (max-width: 1300px){
      .right-help-side {width: 800px;}
  }
</style>
