<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div>

        <quill-editor ref="myTextEditor" :value="defaultcontent" :options="editorOption"  @focus="onEditorFocus($event)" @change="onEditorChange($event)">
          <div id="toolbar" slot="toolbar">

            <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
            <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
            <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
            <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
            <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
            <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
            <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
            <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
            <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
            <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
            <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
            <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
            <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
            <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
            <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>
 
            <span class="ql-formats"><select class="ql-size">
              <option value="small"></option>
              <option selected=""></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select></span>
            <span class="ql-formats"><select class="ql-header">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
              <option value="6"></option>
              <option selected="selected"></option>
            </select></span>
            <span class="ql-formats"><select class="ql-color">
              <option selected="selected"></option>
              <option value="#e60000"></option>
              <option value="#ff9900"></option>
              <option value="#ffff00"></option>
              <option value="#008a00"></option>
              <option value="#0066cc"></option>
              <option value="#9933ff"></option>
              <option value="#ffffff"></option>
              <option value="#facccc"></option>
              <option value="#ffebcc"></option>
              <option value="#ffffcc"></option>
              <option value="#cce8cc"></option>
              <option value="#cce0f5"></option>
              <option value="#ebd6ff"></option>
              <option value="#bbbbbb"></option>
              <option value="#f06666"></option>
              <option value="#ffc266"></option>
              <option value="#ffff66"></option>
              <option value="#66b966"></option>
              <option value="#66a3e0"></option>
              <option value="#c285ff"></option>
              <option value="#888888"></option>
              <option value="#a10000"></option>
              <option value="#b26b00"></option>
              <option value="#b2b200"></option>
              <option value="#006100"></option>
              <option value="#0047b2"></option>
              <option value="#6b24b2"></option>
              <option value="#444444"></option>
              <option value="#5c0000"></option>
              <option value="#663d00"></option>
              <option value="#666600"></option>
              <option value="#003700"></option>
              <option value="#002966"></option>
              <option value="#3d1466"></option>
            </select></span>
            <span class="ql-formats"> <select class="ql-background">
              <option value="#000000"></option>
              <option value="#e60000"></option>
              <option value="#ff9900"></option>
              <option value="#ffff00"></option>
              <option value="#008a00"></option>
              <option value="#0066cc"></option>
              <option value="#9933ff"></option>
              <option selected="selected"></option>
              <option value="#facccc"></option>
              <option value="#ffebcc"></option>
              <option value="#ffffcc"></option>
              <option value="#cce8cc"></option>
              <option value="#cce0f5"></option>
              <option value="#ebd6ff"></option>
              <option value="#bbbbbb"></option>
              <option value="#f06666"></option>
              <option value="#ffc266"></option>
              <option value="#ffff66"></option>
              <option value="#66b966"></option>
              <option value="#66a3e0"></option>
              <option value="#c285ff"></option>
              <option value="#888888"></option>
              <option value="#a10000"></option>
              <option value="#b26b00"></option>
              <option value="#b2b200"></option>
              <option value="#006100"></option>
              <option value="#0047b2"></option>
              <option value="#6b24b2"></option>
              <option value="#444444"></option>
              <option value="#5c0000"></option>
              <option value="#663d00"></option>
              <option value="#666600"></option>
              <option value="#003700"></option>
              <option value="#002966"></option>
              <option value="#3d1466"></option>
            </select></span>
            <span class="ql-formats"><select class="ql-font">
              <option selected="selected"></option>
              <option value="serif"></option>
              <option value="monospace"></option>
            </select></span>
            <span class="ql-formats">
              <select class="ql-align">
              <option selected="selected"></option>
              <option value="center"></option>
              <option value="right"></option>
              <option value="justify"></option>
            </select>
            </span>
            <span class="ql-formats"><button type="button" class="ql-clean"></button></span>
            <span class="ql-formats"><button type="button" class="ql-link"></button></span>                
            <span class="ql-formats"><button type="button" class="ql-video"></button></span>
            <!--图片按钮点击事件-->  
            <button type="button" @click="customButtonClick">img</button>
            <input type="file"  class="custom-input" @change='upload' style='display: none !important;'>
          </div>
        </quill-editor>
    </div>
</template>

<script>
  import axios from '../../http.js';
  import   { Quill } from 'vue-quill-editor';
  import  { quillEditor } from 'vue-quill-editor';
  import {upimg} from '@/api/getData';
  import { ImageResize } from '../../../static/modules/ImageResize.js';
  Quill.register('modules/imageResize', ImageResize);
  export default {
      props:{         
        defaultcontent: {
          type: String,
          default: '请输入内容 '
        }        
      },
      data: function(){
        return {

          editorOption: {
            modules: {                    
              toolbar: '#toolbar',
              imageResize: {
                 displaySize: true
              },
            },
          },

          content:{}
  
        }
      },
      created(){
        
        
        
      },
      watch:{

        content(val) {
          const self = this;
                 
          self.$emit('contentsave',self.content);
          
        },
        defaultcontent(val) {
          console.log(val);
        },
        
      },
      computed:{
  
        editor: {

          get: function () {
            const self = this;
            return self.$refs.myTextEditor.quill;
          },
          set: function (newValue) {
            const self = this;
            self.$refs.myTextEditor.quill = newValue;
          }
        }

      },
      components: {
          quillEditor
      },
      methods: {

        

        onEditorChange({ editor, html, text }) {
          const self = this;
          self.content = html;
        },
          

        onEditorFocus(editor) {
          const self = this;
          
          self.editor = editor   //当content获取到焦点的时候就 存储editor
        },
            
        customButtonClick(){
          const self = this;
          var range
          if (self.editor.getSelection() != null) { 
            range = self.editor.getSelection()
            self.length = range.index  //content获取到焦点，计算光标所在位置，目的为了在该位置插入img
          } else {
            self.length = self.content.length  //content没有获取到焦点时候 目的是为了在content末尾插入img
          }
          self.$el.querySelector('.custom-input').click();   //打开file 选择图片
        },



        async upload(e){

          const self = this;        
          let file = e.target.files[0]
          let param = new FormData()  // 创建form对象

          param.append('file', file, file.name)  // 通过append向form对象添加数据
          param.append('token', self.$store.getters.getUserInfo.token);
          //param.append('chunk', '0') // 添加form表单中其他数据
          //console.log(param.get('file'))  FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          //console.log(param.get('file'));
          var res = await upimg(param,config);

          if(res.statusText == 'OK'){

            self.contentImg = res.data ;    //获取到了图片的URL
                     
            self.editor.insertEmbed(self.length, 'image', self.contentImg); // ★这里才是重点★

            var jqObj=self.$el.querySelector('.custom-input');  
            jqObj.value = "";
            
            

          }
        }
      }        
  }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>