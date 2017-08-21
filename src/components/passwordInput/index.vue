<template>
  <div class="pass-wrapper">
    <div class="pass-container" :style="passStyle">
      <input type="password" ref="input" v-model="inputPwd" @input="handleInputPwd" class="input-pwd" value="" maxlength="6" />
      <div class="pass-item"></div>
      <div class="pass-item"></div>
      <div class="pass-item"></div>
      <div class="pass-item"></div>
      <div class="pass-item"></div>
      <div class="pass-item"></div>
    </div>
    <div class="tail-pwd" :style="passTailStyle">
      <input type="password" v-model="inputPwdTail" ref="inputTail" @keydown="handleTailPwd" class="tail-pwd-input" readonly maxlength="1" />
    </div>
    <label class="password-error">{{errorText}}</label>
  </div>
</template>
<script>
  export default {
    props: ['leftAlign'],
    data () {
      return {
        inputPwd: '',
        inputPwdTail: '',
        errorText: ''
      }
    },
    computed: {
      password () {
        return this.inputPwd + this.inputPwdTail
      },
      passStyle () {
        let style
        if(this.leftAlign) {
          style = 'left: 0px'
        }
        return style
      },
      passTailStyle () {
        let style
        if(this.leftAlign) {
          style = 'left: 250px'
        }
        return style
      }
    },
    watch: {
      password () {
        if(/^\d+$/.test(this.password)) {
          this.errorText = ''
        }else {
          this.errorText = '只能输入数字'
        }
        this.$emit('typing', this.password)
      }
    },
    methods: {
      handleInputPwd (event) {
        if(this.inputPwd.length === 5) {
          let $input = this.$refs.input
          let $inputTail = this.$refs.inputTail
          $input.setAttribute('readonly', 'readonly')
          $input.setAttribute('UNSELECTABLE', 'on')
          $inputTail.removeAttribute('readonly')
          $inputTail.removeAttribute('UNSELECTABLE')
          $inputTail.focus()
        }        
      },
      handleTailPwd (event){
        // 删除键监听
        if(event.keyCode == '8') {
          let $input = this.$refs.input
          let $inputTail = this.$refs.inputTail
          $input.removeAttribute('readonly')
          $input.removeAttribute('UNSELECTABLE');
          if(this.inputPwdTail == '') {
            $input.focus();
            // IE下移动光标到文本末尾
            if (document.selection) {
              var selection = document.selection.createRange();  
              selection.moveStart('character', -this.inputPwd.length);
              selection.move("character", 5);
              selection.select();
            } 
            setTimeout(() => {
              $inputTail.setAttribute('readonly', 'readonly')
              $inputTail.setAttribute('UNSELECTABLE', 'on');
            })
          }
        }
      },
    }
  }
</script>
<style lang="less">
  .pass-container {
    border: 1px solid #ccc;
    width: 300px;
    height: 50px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    left: 160px;
    input:hover {
      outline: none;
    }
    .pass-item {
      width: 50px;
      height: 100%;
      float: left;
      margin: 0;
      box-sizing: border-box;
      &:not(:last-child) {
        border-right: 1px solid #ccc;
      }
    }
    .input-pwd {
      width: 328px;
      height: 100%;
      background-color: transparent;
      background: transparent;
      position: absolute;
      border: none;
      padding: 0px 0 0 20px;
      outline: none;
      font-size: 20px;
      letter-spacing: 36px;
      text-align: left;
      left: 0;
      box-shadow: none;
      z-index: 1;
    }
  }
  .tail-pwd {
    position: absolute;
    height: 50px;
    left: 410px;
    z-index: 10;
    .tail-pwd-input {
      width: 50px;
      height: 100%;
      background-color: transparent;
      background: transparent;
      border: none;
      outline: 0;
      padding: 0 0 0 20px;
      font-size: 20px;
      box-shadow: none;
    }
  }
  .password-error {
    line-height: 30px;
    color: #d82e3a;
    font-size: 14px;
    position: absolute;
    left: 475px;
    top: 10px;
  }
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .pass-container .input-pwd{
        zoom: 1.1;
        -webkit-text-stroke-width: 2px;
    }
    .tail-pwd .tail-pwd-input {
        -webkit-text-stroke-width: 3px;
    }
  }
  ::-ms-clear, ::-ms-reveal{display: none;}

</style>