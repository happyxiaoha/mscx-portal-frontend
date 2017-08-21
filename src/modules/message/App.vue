<template>
  <div class="layout">
    <c-header></c-header>
    <div class="content grid-l">
      <p class="smallNav">当前位置：<a href="index.html">首页</a>>><span>消息管理</span></p>
      <div class="bgWhite noticeListCons">
        <ul class="noticeListConsUl mb25" id="firstPage">
          <li class="clearfix" v-for="item in list">
              <a href="javascript:;" class="fl mes-li" @click="showDetail(item)">{{ item.msgTitle }}({{ item.publishTime ? new Date(item.publishTime).format('yyyyMMdd HH:mm') : '-'}})</a>
          </li>
          <li class="clearfix" v-if="list.length === 0">
            <a href="javascript:;" class="fl">暂无消息</a>
          </li>
        </ul>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  import API from 'common/api'
  require('common/utils/date')
  export default {
    data: function() {
      return {
        list: []
      }
    },
    created () {
      API.Message.getMessageList().then((res) => {
        this.list = res.result
      })
    },
    methods: {
      showDetail(item) {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息详情',
          message: h('div', null, [
            h('div', null, item.msgContent),
            h('div', { style: 'text-align: right' }, new Date(item.publishTime).format('yyyy-MM-dd HH:mm'))
          ]),
          confirmButtonText: '确定'
        })
      }
    },
    components: {
      'c-header': header,
      'c-footer': footer
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  @import "../../assets/less/mixins.less";
  .layout {
    background: #f7f8fc;
    .content {
      margin-top: 20px;
    }
    .smallNav {margin: 15px 0;}
    .noticeListCons{border: 1px solid #ccc;padding: 15px 28px 25px;}
    .noticeListCons .noticeListConsUl li{border-bottom: 1px dashed #CCC;font-size: 14px;padding: 14px 0;line-height: 16px;}
    .noticeListCons .noticeListConsUl li a{ display: block;width: 700px;white-space:nowrap; text-overflow:ellipsis; overflow: hidden;position: relative; padding-left: 16px;}
    .noticeListCons .noticeListConsUl li a:before{content: '';width: 5px;height: 5px;background: #069cd9;position: absolute;left: 0;top: 5px;}
    .noticeListCons .noticeListConsUl li a:hover{color: #069cd9;}
    .dig-con { font-size: 15px; margin: 15px;}
    .dig-time {font-size: 14px;  text-align: right;  margin-right: 15px;}
  }
  
</style>
