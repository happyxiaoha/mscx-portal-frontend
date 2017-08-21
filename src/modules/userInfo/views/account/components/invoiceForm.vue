<template>
  <el-dialog title="添加发票申请" custom-class="invoice-form-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :model="form" class="invoice-form" ref="form" :rules="rules" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response" label-width="150px">
      <el-form-item label="发票类型：" prop="price">
        <el-select v-model="form.invoiceType" placeholder="请选择">
          <el-option
            v-for="item in invoiceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票金额：" prop="applyAmount">
        <el-input v-model="form.applyAmount" auto-complete="off" placeholder="请输入发票金额"></el-input>
        <p class="service-form-tip">您共有{{amountLimit}}元的发票可以开</p>
      </el-form-item>
      <el-form-item label="发票抬头：" prop="taxpayerName">
        <el-input v-model="form.taxpayerName" auto-complete="off" placeholder="请输入发票抬头">
        </el-input>
      </el-form-item>
      <el-form-item label="纳税人识别号：" prop="taxpayerIdentify">
        <el-input v-model="form.taxpayerIdentify" auto-complete="off" placeholder="请输入纳税人识别号">
        </el-input>
      </el-form-item>
      <el-form-item label="收取方式：" prop="tokenType">
        <el-input :disabled="true" value="邮寄">
        </el-input>
      </el-form-item>
      <el-form-item label="邮寄地址：" prop="mailAddress">
        <el-input v-model="form.mailAddress" auto-complete="off" placeholder="请输入邮寄地址">
        </el-input>
      </el-form-item>
      <div v-if="showMoreFormItem">
        <el-form-item label="税务登记号：" prop="taxpayerId">
          <el-input v-model="form.taxpayerId" auto-complete="off" placeholder="请输入税务登记号">
          </el-input>
        </el-form-item>
        <el-form-item label="开户银行：" prop="bankDeposit">
          <el-input v-model="form.bankDeposit" auto-complete="off" placeholder="请输入邮寄地址">
          </el-input>
        </el-form-item>
        <el-form-item label="银行账号：" prop="bankAccount">
          <el-input v-model="form.bankAccount" auto-complete="off" placeholder="请输入邮寄地址">
          </el-input>
        </el-form-item>
        <el-form-item label="开户银行名称：" prop="bankName">
          <el-input v-model="form.bankName" auto-complete="off" placeholder="请输入邮寄地址">
          </el-input>
        </el-form-item>
        <el-form-item label="注册场所地址：" prop="regAddress">
          <el-input v-model="form.regAddress" auto-complete="off" placeholder="请输入邮寄地址">
          </el-input>
        </el-form-item>
        <el-form-item label="注册固定电话：" prop="regPhone">
          <el-input v-model="form.regPhone" auto-complete="off" placeholder="请输入邮寄地址">
          </el-input>
        </el-form-item>
        <el-form-item label="税务登记扫描文件：" prop="taxScannFile">
          <c-upload id="image1" v-on:uploaded="handlePic1Success" name="file" :url="serviceIconUrl">
            <el-upload slot="elUpload" id="serviceIcon" name="file" :action="serviceIconUrl" :on-success="handlePic1Success" :show-file-list="false">
              <img v-if="form.taxScannUrl" :src="form.taxScannUrl" class="picture">
              <i v-else class="el-icon-plus picture-uploader-icon"></i>
            </el-upload>
          </c-upload>        
        </el-form-item>
        <el-form-item label="一般纳税人扫描件：" prop="taxpayerScannFile">
          <c-upload id="image2" v-on:uploaded="handlePic2Success" name="file" :url="serviceIconUrl">
            <el-upload slot="elUpload" id="serviceIcon" name="file" :action="serviceIconUrl" :on-success="handlePic2Success" :show-file-list="false">
              <img v-if="form.taxpayerScannUrl" :src="form.taxpayerScannUrl" class="picture">
              <i v-else class="el-icon-plus picture-uploader-icon"></i>
            </el-upload>
          </c-upload>        
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import {letterAndNumber, price, landlinePhone} from 'common/validation'
  import _ from 'lodash'
  import loadingResponse from 'common/directive/response'
  import upload from 'components/upload/upload'
  export default {
    props: ['visible', 'amountLimit'],
    data () {
      var amountLimitCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入发票金额'));
        } else if (+value > +this.amountLimit) {
          callback(new Error('输入的金额不能大于可开票金额'));
        } else {
          callback();
        }
      }
      return {
        dialogVisible: this.visible,
        showMoreFormItem: false,
        invoiceTypeOptions: [
          {
            value: '01',
            label: '普通发票'
          },{
            value: '02',
            label: '增值税专用发票'
          }
        ],
        serviceIconUrl: API.Order.uploadInvoiceFileUrl,
        submitBtnCtrl: {
          disabled: false
        },
        loading: {
          status: false,
          tip: ''
        },
        response: {},
        form: {
          invoiceType: '01',
          applyAmount: '',
          taxpayerName: '',
          taxpayerIdentify: '',
          tokenType: '20',
          mailAddress: '',
          taxpayerId: '',
          bankDeposit: '',
          bankAccount: '',
          bankName: '',
          regAddress: '',
          regPhone: '',
          taxScannFile: '',
          taxScannUrl: '',
          taxpayerScannFile: '',
          taxpayerScannUrl: ''
        },
        rules: {
          invoiceType: [
            {
              required: true,
              trigger: 'change'
            },{
              validator: price,
              trigger: 'change'
            }
          ],
          applyAmount: [
            {
              required: true,
              message: '请输入发票金额',
              trigger: 'change'
            }, {
              validator: price,
              trigger: 'change'
            }, {
              validator: amountLimitCheck,
              trigger: 'change'
            }
          ],
          taxpayerName: [
            {
              required: true,
              message: '请输入发票抬头',
              trigger: 'change'
            },{
              max: 50,
              message: '发票抬头不能超过50个字符',
              trigger: 'change'
            }
          ],
          taxpayerIdentify: [
            {
              max: 30,
              message: '纳税人识别号不能超过20个字符',
              trigger: 'change'
            },{
              validator: letterAndNumber,
              trigger: 'change'
            }
          ],
          mailAddress: [
            {
              required: true,
              message: '请输入邮寄地址',
              trigger: 'change'
            },{
              max: 50,
              message: '邮寄地址不能超过50个字符',
              trigger: 'change'
            }
          ],
          taxpayerId: [
            {
              required: true,
              message: '请输入税务登记号',
              trigger: 'change'
            },{
              max: 50,
              message: '税务登记号不能超过50个字符',
              trigger: 'change'
            },{
              validator: letterAndNumber,
              trigger: 'change'
            }
          ],
          bankDeposit: [
            {
              required: true,
              message: '请输入开户银行',
              trigger: 'change'
            },{
              max: 50,
              message: '开户银行不能超过50个字符',
              trigger: 'change'
            }
          ],
          bankAccount: [
            {
              required: true,
              pattern: /^\d+$/,
              message: '请输入正确的银行账号',
              trigger: 'change'
            },{
              max: 19,
              message: '银行账号不能超过19个字符',
              trigger: 'change'
            }
          ],
          bankName: [
            {
              required: true,
              message: '请输入开户银行名称',
              trigger: 'change'
            },{
              max: 50,
              message: '开户银行名称不能超过50个字符',
              trigger: 'change'
            }
          ],
          regAddress: [
            {
              required: true,
              message: '请输入注册场所地址',
              trigger: 'change'
            },{
              max: 50,
              message: '注册场所地址不能超过50个字符',
              trigger: 'change'
            }
          ],
          regPhone: [
            {
              required: true,
              message: '请输入注册固定电话',
              trigger: 'change'
            },{
              validator: landlinePhone,
              trigger: 'change'
            }
          ]
        }
      }
    },
    created () {
      
    },
    methods: {
      handleClose (done) {
        this.resetForm('form')
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.resetForm('form')
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      handlePic1Success (res) {
        this.taxScannFileError = ''
        this.form.taxScannFile = ''
        this.form.taxScannUrl = ''
        if(res.status === 'OK') {
          this.form.taxScannFile = res.result.OSSFileKey
          this.form.taxScannUrl = res.result.fileURL
        }else {
          this.taxScannFileError = res.message
        }
      },
      handlePic2Success (res) {
        this.taxpayerScannError = ''
        this.form.taxpayerScannFile = ''
        this.form.taxpayerScannUrl = ''
        if(res.status === 'OK') {
          this.form.taxpayerScannFile = res.result.OSSFileKey
          this.form.taxpayerScannUrl = res.result.fileURL
        }else {
          this.taxpayerScannError = res.message
        }
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.loading.status = true
            API.Order.insertInvoice(this.form).then((res) => {
              this.response = res
              this.loading.tip = '添加发票申请成功！'
              setTimeout(() => {
                this.loading.status = false
                this.closeDialog()
              }, 3000)
            }).catch((res) => {
              this.response = res
              this.loading.tip = res.message || '添加发票申请失败！'
              setTimeout(() => {
                this.loading.status = false
              }, 3000)
            })
          }else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.submitBtnCtrl = {
          disabled: false
        }
        this.loading.status = false
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      form: {
        handler (val, oldVal) {
          if(val.invoiceType === '02') {
            this.showMoreFormItem = true
          }else {
            this.showMoreFormItem = false
          }
        },
        deep: true
      }
    },
    components: {
      'c-upload': upload
    }
  }
</script>
<style lang="less">
  .invoice-form-dialog {
    width: 650px;
    position: relative;
    overflow: hidden;
    .submit-message {
      position: absolute;
      left: 0;
      top: 42px;
    }
    .invoice-form {
      .el-form-item__content {
        width: 60%;
      }
      .picture-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #20a0ff;
        }
      }
      .service-form-tip {
        font-size: 12px;
        margin-top: 3px;
        color: #aaa;
      }
      .picture {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .apply-content {
      min-height: 250px;
    }
    .confirm-btn {
      float: right;
      display: block;
      margin-left: 15px;
    }
  }
</style>