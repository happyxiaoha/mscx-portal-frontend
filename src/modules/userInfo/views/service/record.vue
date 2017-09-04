<template>
  <div class="service-ordered" v-loading="loading">
    <table class="table usercenter-table">
      <thead>
        <tr>
          <th width="10%">购买时间</th>
          <th width="12%">服务名称</th>
          <th width="8%">服务商</th>
          <th width="8%">收费类型</th>
          <th width="8%">购买额度</th>
          <th width="8%">剩余额度</th>
          <th width="17%">接入地址</th>
          <th width="17%">回调地址</th>
          <th width="12%">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="serviceList.length > 0">
          <tr v-for="(item, index) in serviceList">
            <td>{{item.applyTime ? new Date(parseInt(item.applyTime)).format('yyyy-MM-dd') : '-'}}</td>
            <td>
              <a target="_blank" :href="'/services/detail/' + item.sourceId">{{ item.appName }}
              </a>
            </td>
            <td>{{ item.provideName }}</td>
            <td>{{ item.feeType }}</td>
            <td>{{ item.buyLimit }}</td>
            <td>{{ item.leftLimit }}</td>
            <td>{{ item.uri }}</td>
            <td>{{ item.callbackUrl || '-' }}</td>
            <td>
              <template v-if="item.callbackUrl">
                <a href="javascript:;" class="btn-callback" @click="updateCallback(item)">修改回调地址</a>
                <a href="javascript:;" class="btn-callback" @click="deleteCallback(item)">删除回调地址</a>
              </template>
              <template v-else-if="item.isDataCallBack == '1'">
                <a href="javascript:;" @click="addCallback(item)">添加回调地址</a>
              </template>
            </td>            
          </tr>
        </template>
        <tr v-else>
          <td colspan="9">暂无数据</td>
        </tr>
      </tbody>
    </table>
    
    <div class="page-wrapper" v-if="pageInfo.totalSize > 5">
      <el-pagination
        layout="prev, pager, next"
        @current-change="jumpPage"
        :current-page.sync="pageInfo.currentPage"
        :page-size="5"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
    <el-dialog
      v-if="loadCallback"
      size="tiny"
      :title="callbackTitle"
      :visible.sync="callbackVisible">
      <el-form :model="form" label-width="100px" ref="form" :rules="rules">
        <el-form-item label="回调URL" prop="callbackUrl">
          <el-input v-model="form.callbackUrl" auto-complete="off" placeholder="请输入回调URL">
          </el-input>
          <p>例：http://xxx.xxx.xxx</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import API from 'common/api'
  import Axios from 'axios'
  require('common/utils/date')
  export default {
    data () {
      return {      
        activeId: '',  
        loading: false,
        serviceList: {},
        pageInfo: {
          totalSize: 0
        },
        loadCallback: false,
        callbackVisible: false,
        callbackTitle: '',
        updateCallbackFlag: false,
        form : {
          callbackUrl: ''
        },
        rules: {
          callbackUrl: [
            {
              type: 'url',
              required: true,
              message: '请输入正确的回调URL',
              trigger: 'change'
            }
          ],
        },
        params: {
          page: 1,
          pageSize: 5,
        }
      }
    },
    watch: {
      params: {
        handler (val) {
          this.queryService()
        },
        deep: true
      }
    },
    created () {
      this.queryService()
    },
    methods: {
      queryService () {
        // this.loading = true
        this.apiList = []
        API.Common.getServiceList(this.params).then((res) => {
          this.loading = false
          this.serviceList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      closeDialog () {
        this.callbackVisible = false
      },
      addCallback (item) {
        this.callbackTitle = '添加回调地址'
        this.loadCallback = true
        this.callbackVisible = true
        this.updateCallbackFlag = false
        this.activeId = item.sourceId
      },
      updateCallback (item) {
        this.callbackTitle = '修改回调地址'
        this.loadCallback = true
        this.callbackVisible = true
        this.updateCallbackFlag = true
        this.activeId = item.sourceId
        this.form.callbackUrl = item.callbackUrl
      },
      deleteCallback (item) {
        API.App.deleteCallBackUrl({
          id: item.sourceId
        }).then(() => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.callbackVisible = false
          this.queryService()
        }).catch((res) => {
          this.$message({
            message: res.message || '删除失败',
            type: 'warning'
          });
          this.callbackVisible = false
        })
      },
      submit () {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            if(this.updateCallbackFlag) {
              this.form.id = this.activeId
              API.App.updateCallBackUrl(this.form).then(() => {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.callbackVisible = false
                this.queryService()
              }).catch((res) => {
                this.$message({
                  message: res.message || '修改失败',
                  type: 'warning'
                });
              })
            }else{
              this.form.appId = this.activeId
              API.App.addCallBackUrl(this.form).then(() => {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.queryService()
                this.callbackVisible = false
              }).catch((res) => {
                this.$message({
                  message: res.message || '添加失败',
                  type: 'warning'
                });
              })
            }
          }else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .service-ordered {
    .box-shadow();
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    .btn-callback {
      display: block;
    }
  }
  
</style>