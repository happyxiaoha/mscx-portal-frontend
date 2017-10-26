<template>
  <div class="layout">
    <c-header></c-header>
    <div class="content grid-l">
      <img src="./images/aboutus.png"><span class="main-cor">About US</span>
      <div class="content-block">
        <h1 class="desc-title">神州控股</h1>
        <div class="desc">2000年，为顺应互联网时代信息产业的发展，原联想集团一分为二，神州数码控股有限公司由此诞生（以下简称“神州控股”）。2001年，神州控股在香港联合交易所主板上市（股票代码 00861.HK）。目前，神州控股旗下有神州控股（00861.HK）、神州信息（000555.SZ）、鼎捷软件（300378.SZ） 、慧聪网（02280.HK） 四家上市公司，拥有员工上万人。
        作为中国最早从事智慧城市业务的公司之一，神州控股经历了最初的以解决方案为主的城市信息化阶段，积累了强大的跨行业数据整合处理能力以及丰富的客户资源及品牌效应。经过长期的实践和投入，公司率先确立了以互联网为渠道，以跨政务部门数据整合、应用、输出为主的信息化平台运营为依托，向政府、企业和市民提供多元化的城市服务这一全新业务模式。截至目前，与全国5个省份（重庆、河北、河南、海南、江苏）、50个城市签署智慧城市战略合作协议，北京、重庆、本溪等26个城市的公共信息服务平台相继投入建设或运营。
        </div>
        <h1 class="desc-title">神州数码智慧校园平台</h1>
        <div class="desc">聚合神州控股多年来在智慧城市领域积淀的能力，汇聚政府、 公共、市场大数据资源，形成以API、微应用为承载的资源服务能力，打通智慧城市大数据服务的供需对接，打造以神州数码智慧校园平台为核心的智慧城市新生态，助力神州控股成为整个大数据、API的服务商。
        </div>
      </div>
      <div class="content-block info">
        <div class="coop">
          <div class="title">
            <h1>{{result.coopName}}</h1>
            <p class="sub-text">Business Cooperation</p>
          </div>
          <div class="content">
            <p class="sub-text">电话：</p>
            <h1 class="ft24">{{result.coopTel}}</h1>
            <p class="sub-text split">邮箱：</p>
            <h1 class="ft24">{{result.coopMail}}</h1>
          </div>
        </div>
        <div class="support">
          <div class="title">
            <h1>{{result.techName}}</h1>
            <p class="sub-text">Technical Support</p>
          </div>
          <div class="content">
            <p class="sub-text">电话：</p>
            <h1 class="ft24">{{result.techTel}}</h1>
            <p class="sub-text split">邮箱：</p>
            <h1 class="ft24">{{result.techMail}}</h1>
          </div>
        </div>
        <div class="code">
          <div class="title">
            <h1>关注我们</h1>
            <p class="sub-text">Contact US</p>
          </div>
          <div class="content">
            <img class="contact-img" :src="result.QRcode">
          </div>
        </div>
      </div>
      <img src="./images/feedback.png"><span class="main-cor">Feedback</span>
      <div class="content-block">
        <el-form :model="form" label-width="100px" ref="form" :rules="rules">
          <el-form-item prop="content">
            <p>感谢您对神州数码智慧校园的关注与支持！</p>
            <el-input v-model="form.content" type="textarea" auto-complete="off" placeholder="请输入...">
            </el-input>
          </el-form-item>
          <el-form-item class="form-input" label="姓名：" prop="userName">
            <el-input v-model="form.userName" auto-complete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item class="form-input" label="邮箱：" prop="email">
            <el-input v-model="form.email" auto-complete="off" placeholder="请输入邮箱">
            </el-input>
          </el-form-item>
          <el-form-item class="form-input" label="电话：" prop="tel">
            <el-input v-model="form.tel" auto-complete="off" placeholder="请输入电话" @keyup.enter.native="submitForm('form')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button type="default" @click="resetForm('form')">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  import API from 'common/api'
  import {contactWay} from 'common/validation'
  export default {
    data: function() {
      return {
        result: {

        },
        form: {
          content: '',
          userName: '',
          email: '',
          tel: ''
        },
        rules: {
          content: [
            {
              required: true,
              message: '请输入内容',
              trigger: 'change'
            },{
              max: 500,
              message: '内容不能超过500个字符',
              trigger: 'change'
            }
          ],
          userName: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'change'
            }, {
              max: 20,
              message: '姓名不能超过20个字符',
              trigger: 'change'
            }
          ],
          email: [
            {
              type: 'email',
              required: true,
              message: '请输入正确的邮箱',
              trigger: 'change'
            }
          ],
          tel: [
            {
              required: true,
              message: '请输入电话',
              trigger: 'change'
            },{
              validator: contactWay,
              trigger: 'change'
            }
          ]
        }
      }
    },
    created () {
      API.Common.getContactUsCms().then((res) => {
        this.result = res[0]
      })
    },
    methods: {
      resetForm () {
        this.$refs['form'].resetFields()
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            API.Message.submitFeedback(this.form).then(() => {
              this.$message({
                message: '留言成功',
                type: 'success'
              })
              this.resetForm()
            }).catch((res) => {
              this.$message({
                message: res.message || '留言失败',
                type: 'warning'
              })
            })
          }else {
            return false
          }
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
    .main-cor {
      color: @mainBackground
    }
    .content-block {
      .box-shadow();
      box-sizing: border-box;
      padding: 40px 60px;
      margin: 20px 0;
      background: #fff;
      position: relative;
      &.info {
        padding: 0;
        height: 340px;
        background: url(./images/contact-bg.png) center center no-repeat
      }
      h1.desc-title {
        font-weight: 600;
        position: relative;
        left: -60px;
        padding-left: 55px;
        border-left: 5px solid @mainBackground;
      }
      .desc {
        line-height: 30px;
        margin: 20px 0;
        text-indent: 2em;
        color: #666;
        position: relative;
      }
      .coop, .support, .code {
        float: left;
        margin: 40px 0 0 40px;
        color: #fff;
        h1 {
          color: #fff;
        }
        .title {
          padding-left: 90px;
          height: 70px;
          vertical-align: middle;
          display: table-cell;
          background: url(./images/icon-3.png) left center no-repeat;
        }
        .content {
          padding-left: 90px;
        }
      }
      .support {
        .title {
          background: url(./images/icon-2.png) left center no-repeat;
        }
      }
      .code {
        .title {
          background: url(./images/icon-1.png) left center no-repeat;
        }
      }
      .split {
        margin-top: 20px;
      }
      .sub-text {
        color: #aaa;
      }
      .ft24 {
        font-size: 24px;
      }
      .contact-img {
        width: 100px;
      }
      .form-input {
        width: 275px;
      }
    }
  }
  
</style>
