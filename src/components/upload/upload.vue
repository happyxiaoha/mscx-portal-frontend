<template>
  <div>
    <slot v-if="hasFormData" name="elUpload"></slot>
    <div v-else>
      <button type="button" @click="handleClick" class="el-button el-button--ghost">
        <span>上传图片</span>
      </button>
      <input type="file" :id="fileId" :name="name" ref="input" @change="handleChange" class="el-upload__input">
      <img class="preview-img" :src="previewUrl">
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      id: String,
      name: String,
      url: String
    },
    data () {
      return {
        fileId: this.id,
        hasFormData: window.FormData !== undefined,
        previewUrl: ''
      }
    },
    methods: {
      handleClick () {
        this.previewUrl = ''
        if (!this.disabled) {
          this.$refs.input.value = null;
          this.$refs.input.click();
        }
      },
      handleChange () {
        this.iframeUpload({
          uploadId: this.id,
          url: this.url,
          callBack: function(res) {
            if(res.status === 'OK') {
              this.previewUrl = res.result.imageUrl
            }
            this.$emit('uploaded', res)
          }.bind(this)
        });
      },
      iframeUpload (options) {
        /*
          参数说明:
          options.uploadId : 页面里file控件的ID;
          options.url : 文件要提交到的地址;
          options.format : 文件格式，以数组的形式传递，如['jpg','png','gif','bmp'];
          options.callBack : 上传成功后回调;
        */
        var frameName = 'upload-frame';
        var iframe, form, file, fileParent;
        var format = options.format || [];
        //创建iframe和form表单
        iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = frameName;

        form = document.createElement('form');
        form.method = 'post';
        form.style.display = 'none';
        form.target = frameName;
        form.action = options.url;
        form.name = 'form-' + frameName;
        form.enctype = 'multipart/form-data';
        
        file = document.getElementById(options.uploadId);

        fileParent = file.parentNode;

        form.appendChild(file);

        document.body.appendChild(iframe);
        document.body.appendChild(form);

        //取得所选文件的扩展名
        // var fileFormat=/\.[a-zA-Z]+$/.exec(file.value)[0].substring(1);
        // if(format.length < 1 || format.join('-').indexOf(fileFormat)!=-1){
        form.submit();//格式通过验证后提交表单;
        // }else{
        //     fileParent.appendChild(file);
        //     iframe.remove();
        //     form.remove();
        //     alert('文件格式错误，请重新选择！');
        // };

        //文件提交完后
        iframe.onload = function(){
            var data = this.contentWindow.document.body.innerHTML;
            data = JSON.parse(data);
            fileParent.appendChild(file);       
            iframe.parentNode.removeChild(iframe);
            form.parentNode.removeChild(form);
            options.callBack(data);
        }
      }
    }
  }
</script>
<style scoped>
  .preview-img {
    display: inline-block;
    vertical-align: middle;
  }
</style>