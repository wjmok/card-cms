
<template>
<el-upload
  class="upload-demo"
  action=""
  :limit="imglimit"
  :on-success="handlesuccess"
  :on-remove="handleRemove"
  :file-list="normalizedImglist"
  :http-request="handleFileUpload"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,上传张数限制 {{imglimit}}张</div>
</el-upload>

</template>
<script>
import {upimg} from '@/api/getData';
import axios from '../../http.js';
  export default {
    props:{
      imglist:{},
      imglimit:{
            type:Number,
            default:1

      }
    },
    data() {
      return { 

      response:'',

      }
    },
    computed: {
      normalizedImglist: function () {
        if(this.isArrayFn(this.imglist)){
          return this.imglist;
        }else{
          return [];
        }
      }
    },
    methods: {
      isArrayFn(value){
        if (typeof Array.isArray === "function") {
        return Array.isArray(value);
        }else{
        return Object.prototype.toString.call(value) === "[object Array]";
        }
      },

      handleRemove(file, fileList) {
        const self = this;       
        self.$emit('imgchange',fileList);
      },
      
      handlesuccess(response, file, fileList){
        const self = this;
        file.url = self.response;
        self.$emit('imgchange',fileList);
      },
      
      async handleFileUpload(data){
         const self = this;
        let file = data.file;
        let param = new FormData();
        
        param.append('file', file, file.name);
        param.append('token', self.$store.getters.getUserInfo.token);

        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };
        //console.log(self.$store.getters.getUserInfo.token);
        var res = await upimg(param,config);        
        this.response = res.data;

      }
    }
  }
</script>