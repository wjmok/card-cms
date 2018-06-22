


<template>

  <div>
    <el-container>
      <el-header>
        关键词查询:
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText" style="width:260px!important">
        </el-input>

      </el-header>
      <el-main style="height: 500px; border: 2px solid #eee">
        <el-tree
          class="filter-tree"
          :data="menudata"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          accordion
          check-strictly

          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>

        <el-dialog  title="会员卡信息" :visible.sync="dialogFormVisible" >
          <el-form autocomplete="off" >      
            <el-form-item label="菜单名称" :label-width="formLabelWidth" >
              <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
              </el-input>
            </el-form-item>

            <el-form-item label="描述" :label-width="formLabelWidth" >
              <el-input v-model="Form.description" @input="sForm.description = arguments[0]">
              </el-input>
            </el-form-item>
            
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="Form.listorder" @input="sForm.listorder = arguments[0]" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="返还积分" :label-width="formLabelWidth" >
              <el-input   v-model="Form.passage1" @input="sForm.passage1 = arguments[0]">
              </el-input>
            </el-form-item>

            
            
                    
            <el-form-item label="banner图片上传" >
            <imgup @imgchange = "(val)=>{imgchange(val,'sForm','banner')}" :imglist = "Form.banner" :imglimit = "imglimit"></imgup>
            </el-form-item>
            
            
            <el-button type="primary" @click="onSubmit()">确 定</el-button>

          </el-form>              
        </el-dialog>

        <el-dialog  title="添加文章" :visible.sync="artDialogFormVisible" >
          <el-form autocomplete="off" >      
            <el-form-item label="文章名称" :label-width="formLabelWidth" >
              <el-input  v-model="Form.title" @input="sForm.title = arguments[0]">
              </el-input>
            </el-form-item>
            <el-form-item label="文章短标题" :label-width="formLabelWidth" >
              <el-input   v-model="Form.small_title" @input="sForm.small_title = arguments[0]">
              </el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" >
              <el-input   v-model="Form.description" @input="sForm.description = arguments[0]">
              </el-input>
            </el-form-item>
            <el-form-item label="关键词" :label-width="formLabelWidth" >
              <el-input   v-model="Form.keywords" @input="sForm.keywords = arguments[0]">
              </el-input>
            </el-form-item>

            
            
                    
            <el-form-item label="图片上传" >
            <imgup @imgchange = "(val)=>{imgchange(val,'sForm','img')}" :imglist = "Form.img" :imglimit = "imglimit"></imgup>
            </el-form-item>
            <el-form-item label="图文编辑" >
              <editor :defaultcontent = "Form.content" @contentsave = "(val)=>{
                sForm.content = val;
                Form.content = val;}"  >
              </editor>
            </el-form-item>
              
            
            <el-button type="primary" @click="onSubmit()">确 定</el-button>  
                  
          </el-form>              
        </el-dialog>

      </el-main>
      <el-footer style="margin-top:20px;">
        <div class="buttons">
          <el-button v-if="passKey == 'chuncuiwangluo'" @click="handleAddfirst">添加会员卡</el-button>
         
          <el-button @click="handleEdit">编辑</el-button>
          <el-button v-if="passKey == 'chuncuiwangluo'" @click="deleteMenu">删除</el-button>
          
          
        </div>
      </el-footer>
    </el-container>
  </div>
 
</template>

<script>
import {getMenutree,sendMenuEdit,sendMenuAdd,sendMenuDel,sendArtAdd} from '@/api/getData';
import {notify,sCallBack,cloneForm,formatDate,imgchange,getParentNames,getArrayByTarget} from '@/api/commonFunc';
import imgup from '../common/UploadImg';
import baseSelect from '../common/baseSelect';
import editor from '../common/VueEditor';
import axios from '../../http.js';
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

    created(){
      this.initMainData();
    },

    components: {
      
      imgup,
      baseSelect,
      editor,

    },

    data() {
      return {
        filterText: '',
        menudata:[],
        Form: {},//承载页面数据装载
        standardForm:{
          name:'',
          listorder:'',
          banner:[],
          description:'',
          parentid:'',
          parent_array:[],
        },
        artStandardForm:{
          title:'',
          small_title:'',
          description:'',
          keywords:'',
          img:[],
          content:'请输入内容',
        },
        sForm: {},//承载提交数据装载
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        artDialogFormVisible: false,//dialog的显示参数，默认不显示
        
        imglimit:10,//设置上传插件允许上传的张数
        formLabelWidth: '120px',//设置的el-form-item的宽度
        passKey:this.$store.getters.getUserInfo.password,
        token:this.$store.getters.getUserInfo.token,
        searchItem:{
          parentid: 6
        }, 
        
      
        defaultProps: {
          children: 'child',
          label: 'name',
          value: 'id',
        }
      }
    },

    methods: {
      

      async initMainData(){
        const self =this;
        const postData = {};
        postData.token = self.token;
        postData.searchItem = cloneForm(self.searchItem);
        try{
          var res = await getMenutree(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
        if(res){
          self.menudata = res.data;
        };
      },

      

      //添加一级菜单
      handleAddfirst(){
        const self = this;
        self.resetChecked();
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};
        self.sForm.type = 'add'; 
        self.sForm.parentid = 6; 
        self.sForm.token = self.token;
          
        setTimeout(function () {  
             self.dialogFormVisible = true  
          }, 500);
      },

      //添加子菜单
      handleAddchild(){
        const self = this;
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};
        
        const res = self.getCheckedNodes();
        
        
        if(res){
          self.sForm.parentid = res.id;
          self.sForm.type = 'add'; 
          self.sForm.token = self.token;            
          
          setTimeout(function () {  
             self.dialogFormVisible = true  
          }, 500);
        }
      },
      
      //编辑事件
      handleEdit() {
        const self = this;
        self.sForm = {};
        
        const res = self.getCheckedNodes();
        
        if(res){

          self.Form = cloneForm(res);
          self.sForm.id = res.id;
          self.sForm.type = 'edit'; 
          self.sForm.token = self.token;

          setTimeout(function () {  
             self.dialogFormVisible = true  
          }, 500); 
          
        }            
      },
      //删除事件
      deleteMenu(){
        const self = this;
        self.sForm = {};
        const delres = self.getCheckedNodes();
        
        if(delres){
          self.sForm.id = delres.id;
          self.sForm.token = self.token;
          self.sForm.type = 'del';
          self.onSubmit();
        }
      },
      //添加文章
      addArticle(){
        const self = this;
        self.Form = cloneForm(self.artStandardForm);
        self.sForm = {};

        const res = self.getCheckedNodes();
        if(res){
          self.sForm.menu_id = res.id;
          self.sForm.token = self.token;
          self.sForm.type = 'addArticle'; 
          
          setTimeout(function () {  
             self.artDialogFormVisible = true  
          }, 500);
        }

      },



      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
        console.log(self.sForm);
       
        if (self.sForm.type == 'edit') { 

          

          
          delete self.sForm.type;
          try {
            var res = await sendMenuEdit(self.sForm);
          } catch (err) {
              console.log(err); 
              notify('网络故障','error');              
          };
          self.sForm.type = 'edit';

        }else if(self.sForm.type == 'add'){
 
          
            delete self.sForm.type;
            try {
               var res = await sendMenuAdd(self.sForm); 
            } catch (err) {
                console.log(err); 
                notify('网络故障','error');             
            };
            self.sForm.type = 'add';
            console.log(self.sForm);

          
                                                              
        }else if(self.sForm.type == 'addArticle'){

          delete self.sForm.type;
          try {
            var res = await sendArtAdd(self.sForm);
          } catch (err) {
              console.log(err); 
              notify('网络故障','error');
          };
          self.sForm.type = 'addArticle';
          
        }else if(self.sForm.type == 'del'){

          delete self.sForm.type;
          try{
            var res = await sendMenuDel(self.sForm);
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'del';
        };

        if(res){
          var fCall =  sCallBack(res);
          if(fCall == 'success'){
            if(self.sForm.type == 'addArticle'){
              self.artDialogFormVisible = false;
            }else{
              self.dialogFormVisible = false;
            };
            self.resetChecked();
            self.initMainData();
          };
        };
        
      },
      

      

      



      //menu过滤筛选事件
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //获取menu tree点击事件
      getCheckedNodes() {
        const data = this.$refs.tree.getCheckedNodes();
        if(data.length > 1){
            notify('请只选择一个菜单','warning');
            this.resetChecked(); 
        };
        if(data.length == 1){
           return data[0];
        };
        if(data.length == 0){
          notify('请选择一个菜单','warning');
          this.resetChecked();
        }
      },
      //清空选中上传状态
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },




      //图片上传的回调
      imgchange(data,formName,fieldName){
        return imgchange(this,data,formName,fieldName);
      },


      
    }
  }
</script>