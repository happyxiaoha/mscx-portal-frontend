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
    <!-- <c-message v-if="loadMessageBox" :message="currentItem" ref="messageBox"></c-message> -->
    <detail-table-dialog 
      :type="type" 
      v-if="loadDetailTable" 
      :resId="currentItem.resId"
      :visible="detailTableDialogVisible"  
      @toggle="toggleDetailTableVisible"></detail-table-dialog>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  import detailDialog from './components/detail'
  import API from 'common/api'
  require('common/utils/date')
  export default {
    data: function() {
      return {
        list: [],
        currentItem: {},
        loadDetailTable: false,
        resId: '',
        detailTableDialogVisible: false,
        type: ''
      }
    },
    created () {
      API.Message.getMessageList().then((res) => {
        this.list = res.result
      })
    },
    methods: {
      showDetail (arg) {
        let item = arg
        if(item.resId && item.resType) {
          const h = this.$createElement
          this.currentItem = item
          this.$msgbox({
            title: item.msgTitle,
            message: h('div', null, [
              h('div', { style: 'line-height: 1.8' }, [
                h('span', null, item.msgContent.slice(0, item.msgContent.indexOf('<%=contractStaRes%>'))),
                h('a', {
                  on: {
                    click: this.showResDetail
                  },
                  attrs: {
                    href: 'javascript:;'
                  }
                }, '查看详情'),
                h('span', null, item.msgContent.slice(item.msgContent.indexOf('<%=contractStaRes%>') + '<%=contractStaRes%>'.length, item.msgContent.indexOf('<%=contractStaInvoke%>'))),
                h('a', {
                  on: {
                    click: this.showInvokeDetail
                  },
                  attrs: {
                    href: 'javascript:;'
                  }
                }, '调用记录详情'),
                h('span', null, '。')
              ]),
              h('div', { style: 'text-align: right' }, '神州数云"贵阳平台称数创易"运营团队'),
              h('div', { style: 'text-align: right' }, new Date(item.publishTime).format('yyyy-MM-dd HH:mm'))
            ]),
            confirmButtonText: '确定'
          })
        }else {
          this.$msgbox({
            title: item.msgTitle,
            message: item.msgContent,
            confirmButtonText: '确定'
          })
        }
      },
      showResDetail () {
        this.type = 'resource'
        this.loadDetailTable = true
        this.detailTableDialogVisible = true
      },
      showInvokeDetail () {
        this.type = 'invoke'
        this.loadDetailTable = true
        this.detailTableDialogVisible = true
      },
      toggleDetailTableVisible (arg) {
        this.detailTableDialogVisible = arg
      }
    },
    components: {
      'c-header': header,
      'c-footer': footer,
      'detail-table-dialog': detailDialog
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  @import "../../assets/less/mixins.less";
  .el-message-box {
    width: 600px;
  }
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
